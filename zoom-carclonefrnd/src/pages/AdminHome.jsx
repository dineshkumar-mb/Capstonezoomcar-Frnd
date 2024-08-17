import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/Defaultlayout";
import { deleteCar, getAllCars } from "../features/carsSlice";
import { Col, Row, Divider, DatePicker } from "antd";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";

const { RangePicker } = DatePicker;

function AdminHome() {
  const { cars } = useSelector((state) => state.cars); // Updated the selector
  const { loading } = useSelector((state) => state.alerts); // Updated the selector
  const [totalCars, setTotalcars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  useEffect(() => {
    setTotalcars(cars);
    setFilteredCars(cars);
  }, [cars]);

  // Handler for date range filter
  // Handler for date range filter
// const handleDateRangeChange = (dates) => {
//   if (dates) {
//     const startDate = dates[0].toISOString();
//     const endDate = dates[1].toISOString();

//     const filtered = totalCars.filter((car) => {
//       if (!car.createdAt) {
//         return false; // Skip cars with undefined createdAt
//       }
//       const carDate = new Date(car.createdAt).toISOString();
//       return carDate >= startDate && carDate <= endDate;
//     });

//     setFilteredCars(filtered);
//   } else {
//     setFilteredCars(totalCars);
//   }
// };

  // const handleDateRangeChange = (dates) => {
  //   if (dates) {
  //     const startDate = dates[0].toISOString();
  //     const endDate = dates[1].toISOString();

  //     const filtered = totalCars.filter((car) => {
  //       const carDate = new Date(car.createdAt).toISOString();
  //       return carDate >= startDate && carDate <= endDate;
  //     });

  //     setFilteredCars(filtered);
  //   } else {
  //     setFilteredCars(totalCars);
  //   }
  // };

  return (
    <DefaultLayout>
      <Row justify="center" gutter={16} className="mt-2">
        <Col lg={20} sm={24}>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mt-1 mr-2">Admin Panel</h3>
            <button className="btn1">
              <Link to="/addcar">ADD CAR</Link>
            </button>
          </div>
        </Col>
      </Row>

      {/* Date range picker to filter cars based on their addition date */}
      {/* <Row justify="center" gutter={16} className="mt-3">
        <Col lg={20} sm={24}>
          <RangePicker onChange={handleDateRangeChange} />
        </Col>
      </Row> */}

      <Divider />

      {loading && <Spinner />}

      <Row justify="center" gutter={16}>
        {filteredCars.map((car) => (
          <Col lg={5} sm={24} xs={24} key={car._id}>
            <div className="car p-2 bs1">
              <img src={car.Imageurl} className="carimg" alt={car.Carname} />

              <div className="car-content d-flex align-items-center justify-content-between">
                <div className="text-left pl-2">
                  <p>{car.Carname}</p>
                  <p>Rent Per Hour {car.RentPerHour} /-</p>
                </div>

                <div className="mr-4">
                  <Link to={`/editcar/${car._id}`}>
                    <EditOutlined
                      className="mr-3"
                      style={{ color: "green", cursor: "pointer" }}
                    />
                  </Link>

                  <Popconfirm
                    title="Are you sure to delete this car?"
                    onConfirm={() => {
                      dispatch(deleteCar({ carid: car._id }));
                    }}
                    okText="Yes"
                    cancelText="No"
                  >
                    <DeleteOutlined
                      style={{ color: "red", cursor: "pointer" }}
                    />
                  </Popconfirm>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </DefaultLayout>
  );
}

export default AdminHome;


