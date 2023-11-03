import React, { useState, useEffect } from 'react';
import Card from './Card';

const Home = () => {
  const [alumni, setAlumni] = useState([]);
  const [search, setSearch] = useState('');
  const [sortDirection, setSortDirection] = useState('asc'); // 'asc' for ascending, 'desc' for descending

  const [filteredAlumni, setFilteredAlumni] = useState([]);
  const [filters, setFilters] = useState({
    batch: '',
    department: '',
    domainOfWork: '',
    company: '',
  });

  const userContact = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/alumni', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.status === 200) {
        const data = await res.json();
        console.log(data);
        setAlumni(data);
        setFilteredAlumni(data);
      } else {
        const error = new Error(res.statusText);
        throw error;
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    userContact();
  }, []);

  const handleFilter = () => {
    const { batch, department, domainOfWork, company } = filters;
    const filteredData = alumni.filter((alumnus) => {
      return (
        (batch === '' || alumnus.batch === batch) &&
        (department === '' || alumnus.Department === department) &&
        (domainOfWork === '' || alumnus.DomainOfWork === domainOfWork) &&
        (company === '' || alumnus.currentCompany === company) &&
        (search === '' ||
          `${alumnus.firstName} ${alumnus.lastName}`
            .toLowerCase()
            .includes(search.toLowerCase())
        )
      );
    });

    // Sort the filtered alumni list based on firstName and lastName
    filteredData.sort((a, b) => {
      const nameA = `${a.firstName} ${a.lastName}`;
      const nameB = `${b.firstName} ${b.lastName}`;
      return sortDirection === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });

    setFilteredAlumni(filteredData);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <h2>Filter Alumni</h2>
          <div className="form-group">
            <label htmlFor="batch">Batch:</label>
            <select
              name="batch"
              id="batch"
              value={filters.batch}
              onChange={handleFilterChange}
            >
              <option value="">Select Batch</option>
              {Array.from(new Set(alumni.map((a) => a.batch))).map((batch) => (
                <option key={batch} value={batch}>
                  {batch}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="department">Department:</label>
            <select
              name="department"
              id="department"
              value={filters.department}
              onChange={handleFilterChange}
            >
              <option value="">Select Department</option>
              {Array.from(new Set(alumni.map((a) => a.Department))).map(

                (department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                )
              )}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="domainOfWork">Domain of Work:</label>
            <select
              name="domainOfWork"
              id="domainOfWork"
              value={filters.domainOfWork}
              onChange={handleFilterChange}
            >
              <option value="">Select All</option>
              {Array.from(new Set(alumni.map((a) => a.DomainOfWork))).map(
                (domain) => (
                  <option key={domain} value={domain}>
                    {domain}
                  </option>
                )
              )}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="company">Company:</label>
            <select
              name="company"
              id="company"
              value={filters.company}
              onChange={handleFilterChange}
            >
              <option value="">Select All</option>
              {Array.from(new Set(alumni.map((a) => a.currentCompany))).map(
                (company) => (
                  <option key={company} value={company}>
                    {company}
                  </option>
                )
              )}
            </select>
          </div>
          <button className="btn btn-primary" onClick={handleFilter}>
            Filter
          </button>
        </div>
        <div className="col-md-9">
          <div className="text-right">
            <input
              type="text"
              placeholder="Search by name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleFilter}>
              Search
            </button>
            <select
              value={sortDirection}
              onChange={(e) => setSortDirection(e.target.value)}
            >
              <option value="asc">Sort A-Z</option>
              <option value="desc">Sort Z-A</option>
            </select>
          </div>

          <h2>Our Alumni</h2>
          <div className="row">
            {filteredAlumni.map((ele) => (
              <div className="col-md-4" key={ele._id}>
                <Card data={ele} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
