import React, { Component } from "react";
import "../style/post.css";
import axios from "axios";

var URI = "http://104.248.145.103:4000/";

// Code bên web cũ

// function handleSubmit() {
//   var testCase = parseInt(document.getElementById("numberTestCase").value);
//   var sampleTestCase = parseInt(
//     document.getElementById("numberSampleTestCase").value
//   );
//   var title = String(document.getElementById("txtTitle").value.trim());
//   var description = String(
//     document.getElementById("txtDescription").value.trim()
//   );
//   if (
//     testCase != 0 &&
//     sampleTestCase != 0 &&
//     title != "" &&
//     description != ""
//   ) {
//     postQuestionProcess();
//   } else {
//     alert("Vui lòng nhập đầy đủ!!!");
//   }
// }

// function renderLastId(data) {
//   for (var question of data) {
//     return question.Question_id;
//   }
// }

// function postQuestionProcess() {
//   axios.get(URI + "questions/getlastid").then((response) => {
//     var data = response.data;
//     var Question_id = renderLastId(data) + 1;
//     runPostQuestion(Question_id);
//   });
// }

// function runPostQuestion(Question_id) {
//   var title = String(document.getElementById("txtTitle").value.trim());
//   var description = String(
//     document.getElementById("txtDescription").value.trim()
//   );
//   var topic = String(document.getElementById("topic").value);
//   var level = String(document.getElementById("level").value);
//   var today = new Date();
//   var date =
//     today.getFullYear() +
//     "-" +
//     (today.getMonth() + 1) +
//     "-" +
//     today.getDate() +
//     " " +
//     today.getHours() +
//     ":" +
//     today.getMinutes() +
//     ":" +
//     today.getSeconds();
//   var param = {
//     Question_id: Question_id,
//     Title: title,
//     Description: description,
//     CreateDate: date,
//     Topic: topic,
//     Level: level,
//     Author_id: sessionStorage.getItem("Author_Id"),
//   };
//   console.log("Question", param);
//   submitQuestion(param, Question_id);
// }

// function submitQuestion(param, Question_id) {
//   axios.post(URI + "questions/add", param).then((response) => {
//     var result = response.data;
//     runPostSampleTestCase(Question_id);
//   });
// }

// function runPostSampleTestCase(Question_id) {
//   var totalSampleTestCase = parseInt(
//     document.getElementById("numberSampleTestCase").value
//   );
//   for (var i = 0; i < totalSampleTestCase; i++) {
//     var inputId = String("txtSampleTestCaseInput" + i);
//     var outputId = String("txtSampleTestCaseOutput" + i);
//     var input = String(document.getElementById(inputId).value.trim());
//     var output = String(document.getElementById(outputId).value.trim());
//     var param = {
//       Question_id: Question_id,
//       Input: input,
//       Output: output,
//     };
//     submitSampleTestCase(param, i, totalSampleTestCase, Question_id);
//   }
// }

// function submitSampleTestCase(param, i, totalSampleTestCase, Question_id) {
//   axios.post(URI + "sampletestcases/add", param).then((response) => {
//     var result = response.data;
//     if (i == totalSampleTestCase - 1) {
//       runPostTestCase(Question_id);
//     }
//   });
// }

// function runPostTestCase(Question_id) {
//   var totalTestCase = parseInt(document.getElementById("numberTestCase").value);
//   for (var i = 0; i < totalTestCase; i++) {
//     var inputId = String("txtTestCaseInput" + i);
//     var outputId = String("txtTestCaseOutput" + i);
//     var input = String(document.getElementById(inputId).value.trim());
//     var output = String(document.getElementById(outputId).value.trim());
//     var param = {
//       Question_id: Question_id,
//       Input: input,
//       Output: output,
//     };
//     submitTestCase(param, i, totalTestCase);
//   }
// }

// function submitTestCase(param, i, totalTestCase) {
//   axios.post(URI + "testcases/add", param).then((response) => {
//     var result = response.data;
//     if (i == totalTestCase - 1) {
//       location.reload();
//     }
//   });
// }

// function setPostQuestion() {
//   var role = sessionStorage.getItem("Role");
//   if (role == "Author") {
//     document.getElementById("account").innerHTML =
//       sessionStorage.getItem("Author_FullName");
//   } else {
//     document.getElementById("account").innerHTML =
//       sessionStorage.getItem("Student_FullName");
//   }
// }

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sampleTestCases: Number,
      testCases: Number,
      question: [{input:String,output:String}],
    };
    this.handleSampleTestCases = this.handleSampleTestCases.bind(this);
    this.handleTestCases = this.handleTestCases.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  // Hàm handle các Input như tiêu đề, mô tả, level,...
  handleInputChange = (e) => {
    var value = Number(e.target.value);
    this.setState({ sampleTestCases: value });
  };
  handleSampleTestCases = (e) => {
    var value = Number(e.target.value);
    this.setState({ sampleTestCases: value });
  };
  handleTestCases = (e) => {
    var value = Number(e.target.value);
    console.log(value);
    this.setState({ testCases: value });
  };
  renderSampleTestCase(numberSampleTestCase) {
    var content = [];
    for (var i = 0; i < numberSampleTestCase; i++) {
      content.push(
        <>
          <label>Test case ví dụ {Number(i) + 1} </label>
          <input
            type="text"
            class="form-control"
            id={`txtSampleTestCaseInput${i}`}
            placeholder="Input"
          />
          <input
            type="text"
            class="form-control"
            id={`txtSampleTestCaseOutput${i}`}
            placeholder="Output"
          />
        </>
      );
    }
    return content;
  }
  renderTestCase(numberTestCase) {
    var content = [];
    for (var i = 0; i < numberTestCase; i++) {
      content.push(
        <>
          <label>Test case ẩn {Number(i) + 1} </label>
          <input
            type="text"
            class="form-control"
            id={`txtTestCaseInput${i}`}
            placeholder="Input"
          />
          <input
            type="text"
            class="form-control"
            id={`txtTestCaseOutput${i}`}
            placeholder="Output"
          />
        </>
      );
    }
    return content;
  }
  render() {
    return (
      <section className="post-practice">
        <div className="container-fluid  bg-gray-100 rounded-3xl shadow-sm">
          <div className="row">
            <div className="col-6 mx-auto">
              <h3 className="display-4 text-center mt-5">Nhập thông tin bài</h3>
              <form action="">
                <div className="form-group">
                  <label>Tiêu đề: </label>
                  <input type="text" className="form-control" name="txtTitle" id="txtTitle" />
                </div>
                <div className="form-group">
                  <label>Mô tả: </label>
                  <textarea
                    className="form-control"
                    name="txtDescription"
                    cols={30}
                    rows={10}
                    id="txtDescription"
                    defaultValue={""}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor>Chủ đề:</label>
                  <select name="topic" id="topic" className="form-control">
                    <option>Cơ bản</option>
                    <option>Nâng cao</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor>Cấp độ:</label>
                  <select name="level" id="level" className="form-control">
                    <option>Dễ</option>
                    <option>Trung bình</option>
                    <option>Khó</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor>Số lượng test case ví dụ:</label>
                  <select
                    name="numberSampleTestCase"
                    id="numberSampleTestCase"
                    className="form-control"
                    onChange={this.handleSampleTestCases}
                  >
                    <option defaultValue>-Chọn-</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                  </select>
                </div>
                <div id="sampleTestCase">
                  {this.renderSampleTestCase(this.state.sampleTestCases)}
                </div>
                <div className="form-group">
                  <label>Số lượng test case ẩn:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="numberTestCase"
                    onChange={this.handleTestCases}
                    placeholder="Nhập số lượng test case ẩn"
                  />
                </div>
                {this.renderTestCase(this.state.testCases)}
                <div className="form-group text-center">
                  <button
                    // onClick={handleSubmit()}
                    className="btn btn-success mt-3"
                  >
                    Xác Nhận
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Post;
