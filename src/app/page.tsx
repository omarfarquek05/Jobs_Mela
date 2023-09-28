"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, message } from "antd";
import axios from "axios";
import { SetLoading } from "@/redux/loadersSlice";
import Divider from "@/components/Divider";
import { useRouter } from "next/router";
import Filters from "@/components/Filters";

interface Job {
  _id: string;
  title: string;
  location: string;
  salaryFromRange: number;
  salaryToRange: number;
  workMode: string;
  user: {
    name: string;
  };
  deadline: string; // Adjust the type to match your actual data structure
}

interface Filters {
  searchText: string;
  location: string;
}

function Home() {
  const [filters, setFilters] = useState<Filters>({
    searchText: "",
    location: "",
  });
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const dispatch = useDispatch();

  const fetchJobs = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get(`/api/jobs`, { params: filters });
      setJobs(response.data.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  useEffect(() => {
    fetchJobs();

    const timer = setInterval(() => {
      const currentTime = new Date();
      const filteredJobs = jobs?.filter(
        (job) => new Date(job?.deadline) > currentTime
      );
      setJobs(filteredJobs);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <Filters filters={filters} setFilters={setFilters} getData={fetchJobs} />
      <Row>
        {jobs.map((job: Job) => (
          <Col
            span={8}
            className="p-2"
            key={job._id}
            onClick={() => router.push(`/jobinfo/${job._id}`)}
          >
            <div className="card flex flex-col gap-2 cursor-pointer p-2">
              <h1 className="text-md">{job.title}</h1>
              <Divider />

              <div className="flex justify-between">
                <span>Company</span>
                <span>{job.user.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Location</span>
                <span>{job.location}</span>
              </div>

              <div className="flex justify-between">
                <span>Salary</span>
                <span>
                  {job.salaryFromRange} LPA - {job.salaryToRange} LPA
                </span>
              </div>

              <div className="flex justify-between">
                <span>Work Mode</span>
                <span>{job.workMode}</span>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Home;
