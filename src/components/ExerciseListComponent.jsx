/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import img2 from "../assets/images/img2.jpg";
import img4 from "../assets/images/img4.jpg";
import img5 from "../assets/images/img5.jpg";
import img6 from "../assets/images/img6.jpg";

import { Link } from "react-router-dom";


class ExerciseListComponent extends Component {
  handleClick(data) {
    sessionStorage.setItem("Question_id", data.Question_id);
    sessionStorage.setItem("Question_description", data.Description);
  }
  handlePagination() {
    return (
      <div className="mt-4 flex justify-center">
        <nav aria-label="Page navigation example">
          <ul className="flex list-style-none">
            <li className="page-item disabled">
              <a
                className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-500 pointer-events-none focus:shadow-none"
                href="#"
                tabIndex={-1}
                aria-disabled="true"
              >
                Previous
              </a>
            </li>
            <li className="page-item active">
              <a
                className="page-link relative block py-1.5 px-3  border-0 bg-blue-600 outline-none transition-all duration-300 rounded text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md"
                href="#"
              >
                1 <span className="visually-hidden">(current)</span>
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                href="#"
              >
                2
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                href="#"
              >
                3
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                href="#"
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
  render() {
    const exercisesList = this.props.exercises.exercises.map(
      (exercise, idx) => {
        var href = "/editor/" + exercise.Question_id;
        return (
          <div className="mb-10">
            <div className="relative w-72 h-[30rem] block bg-white rounded-lg shadow-lg">
              <div className="flex">
                <div
                  className="relative overflow-hidden bg-no-repeat bg-cover shadow-lg rounded-lg mx-4 -mt-4"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >
                  {idx % 4 === 0 ? (
                    <img
                      src="https://bizflyportal.mediacdn.vn/thumb_wm/1000,100/bizflyportal/images/cod16174155365053.jpeg"
                      className="w-[1000px]"
                      alt=""
                    />
                  ) : idx % 4 === 1 ? (
                    <img src={img5} className="w-[1000px] h-[140px]" alt="" />
                  ) : idx % 4 === 2 ? (
                    <img src={img4} className="w-[1000px] h-[140px]" alt="" />
                  ) : (
                    <img src={img6} className="w-[1000px] h-[140px]" alt="" />
                  )}

                  <Link
                    to={{
                      pathname: `${href}`,
                    }}
                    className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 hover:opacity-100 transition duration-300 ease-in-out"
                    style={{
                      backgroundColor: "rgba(251, 251, 251, 0.15)",
                    }}
                    onClick={() => {
                      this.handleClick(exercise);
                    }}
                  ></Link>
                </div>
              </div>
              <div className="p-6 relative">
                <h5 className="font-bold text-lg mb-3 text-center">{exercise.Title}</h5>
                <p className="mb-2">{exercise.Description}</p>
                <p className="mb-1">Level: {exercise.Level}</p>
                <p className="mb-1">Topic: {exercise.Topic}</p>
                <Link
                  to={{
                    pathname: `${href}`,
                  }}
                  className="inline-block absolute left-24 top-64 px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  onClick={() => {
                    this.handleClick(exercise);
                  }}
                >
                  Làm Bài
                </Link>
              </div>
            </div>
          </div>
        );
      }
    );
    return (
      <div>
        <div className="container my-4 px-6 mx-auto">
          <img src={img2} className="w-full h-52 mb-3" alt="" />
          <section className="mb-32 text-gray-800">
            <h2 className="text-3xl font-bold mb-12 pb-4 text-center">
              Danh sách bài tập
            </h2>
            <div className="grid lg:grid-cols-3 gap-6 xl:gap-x-12">
              {exercisesList}
            </div>
            {this.handlePagination()}
          </section>
        </div>
      </div>
    );
  }
}
export default ExerciseListComponent;
