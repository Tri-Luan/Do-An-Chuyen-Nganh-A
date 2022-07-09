import axios from "axios";
import React, { useState } from "react";
import { baseUrl } from "../shared/baseUrl";
import congraratulation from "../assets/images/congratulation.gif";
import {Navigate} from "react-router-dom";

const Result = () => {
  const [navigate, setNavigate] = useState(false);

  const displayResult = () => {
    return (
      <>
        <h3 className="mt-3">
          Câu hỏi: {sessionStorage.getItem("Description")}
        </h3>
        <div
          className="mt-3 "
          dangerouslySetInnerHTML={displayTestCaseFail()}
        />
        <h1 className="mt-4 text-3xl font-medium text-center text-danger">
          Đạt: {sessionStorage.getItem("Pass")} /
          {sessionStorage.getItem("Total_TestCases")} test cases
        </h1>
      </>
    );
  };

  const addHistoryResultProcess = () => {
    var questionId = sessionStorage.getItem("Question_id");
    var questionDescription = sessionStorage.getItem("Description");
    var studentId = sessionStorage.getItem("Student_Id");
    var pass = String(
      sessionStorage.getItem("Pass") +
        "/" +
        sessionStorage.getItem("Total_TestCases")
    );
    var testCaseFail = String(renderTestCaseFail());
    var sourceCode = sessionStorage.getItem("SourceCode");
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate() +
      " " +
      today.getHours() +
      ":" +
      today.getMinutes() +
      ":" +
      today.getSeconds();
    var param = {
      Question_id: questionId,
      question_description: questionDescription,
      Student_id: studentId,
      Pass: pass,
      Testcase_fail: testCaseFail,
      Languages: String(sessionStorage.getItem("Languages")),
      Source_code: sourceCode,
      Submit_date: date,
    };
    postHistoryResult(param);
  };

  const postHistoryResult = (param) => {
    axios.post(baseUrl + "historypractices/add", param).then((response) => {
      var result = response.data;
      console.log(result);
    });
    clearSessionStorage();
  };

  const renderTestCaseFail = () => {
    var tmp =
      sessionStorage.getItem("Total_TestCases") -
      sessionStorage.getItem("Pass");
    var data = "";
    if (tmp !== 0) {
      for (var i = 0; i < tmp; i++) {
        var name = String("Fail" + i);
        data += String(sessionStorage.getItem(name)) + "\n";
      }
    }
    return data;
  };

  const displayTestCaseFail = () => {
    var temp =
      sessionStorage.getItem("Total_TestCases") -
      sessionStorage.getItem("Pass");
    let content = ``;
    if (temp !== 0) {
      for (var i = 0; i < temp; i++) {
        var name = String("Fail" + i);
        content += `<h2 className="text-red-600">Testcase false ${
          i + 1
        }</h2><p>${sessionStorage.getItem(name)}</p>`;
      }
    }
    return { __html: content };
  };

  const clearSessionStorage = () => {
    var tmp =
      sessionStorage.getItem("Total_TestCases") -
      sessionStorage.getItem("Pass");
    if (tmp !== 0) {
      for (var i = 0; i <tmp; i++) {
        var name = String("Fail" + i);
        sessionStorage.removeItem(name);
      }
    }
    alert("Success!");
    setNavigate(true);
  };
  const handleButton_Back = () => {
    var tmp =
      sessionStorage.getItem("Total_TestCases") -
      sessionStorage.getItem("Pass");
    if (tmp !== 0) {
      for (var i = 0; i <tmp; i++) {
        var name = String("Fail" + i);
        sessionStorage.removeItem(name);
      }
    }
    setNavigate(true);
  };
  return (
    <div class="container mt-5 mb-24">
      {navigate ? <Navigate to="/practice" replace={true} /> : null}
      <img
        src={congraratulation}
        className="mx-auto my-5 rounded shadow-lg"
        alt="congratulation"
      />
      <h2 className="text-3xl font-bold mb-3 pb-4 text-center">
        Nộp bài thành công
      </h2>
      <div className="row justify-content-around">
        <form
          action=""
          className="col-8 bg-gray-100 p-5 border border-primary rounded"
        >
          <h1 className="text-center text-3xl text-blue-500  text-uppercase">
            Kết quả
          </h1>
          {displayResult()}
          <button
            className="btn btn-primary btn-lg btn-block mt-5"
            onClick={() => handleButton_Back()}
          >
            Quay lại luyện tập
          </button>
          {sessionStorage.getItem("Role") === "Student" ? (
            <button
              className="btn bg-lime-600 btn-lg btn-block mt-5"
              onClick={() => addHistoryResultProcess()}
            >
              Lưu lịch sử làm bài
            </button>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default Result;
