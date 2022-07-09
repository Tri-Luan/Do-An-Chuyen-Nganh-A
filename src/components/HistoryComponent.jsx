import { Component } from "react";
import { baseUrl } from "../shared/baseUrl";
import axios from "axios";
import { Navigate } from "react-router-dom";

class History extends Component {
  constructor(props) {
    super(props);
    this.state = { content: [], navigate: false,href:"#"};
  }
  componentDidMount() {
    this.getHistory();
  }
  handleButton(Source_code,Question_id,Description) {
    let href='/editor/'+Question_id;
    sessionStorage.setItem("Source_code", Source_code)
    this.setState({ navigate: true,href:href });
    sessionStorage.setItem("Question_id", Question_id);
    sessionStorage.setItem("Question_description",Description);
  }
  getHistory() {
    this.setState({ content: [] });
    axios
      .get(
        baseUrl +
          "historypractices/gethistorypractice/" +
          sessionStorage.getItem("Student_Id")
      )
      .then((response) => {
        var data = response.data;
        this.renderHistory(data);
      });
  }
  renderHistory(data) {
    var content = [];
    for (let i = 0; i < data.length; i++) {
      content.push(
        <tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {i + 1}
          </td>
          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            {data[i].Question_description}
          </td>
          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            {this.renderCreateDate(data[i].Submit_date)}
          </td>
          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            <button
              className="text-[#5089eb]"
              onClick={() => this.handleButton(data[i].Source_code,data[i].Question_id,data[i].Question_description)}
            >
              Xem chi tiết
            </button>
          </td>
          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            {data[i].Pass}
          </td>
          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            {this.renderTestCaseFail(data[i].Testcase_fail)}
          </td>
        </tr>
      );
    }
    this.setState({ content: content });
  }
  renderCreateDate(createDate) {
    return String(
      createDate.slice(8, 10) +
        "-" +
        createDate.slice(5, 7) +
        "-" +
        createDate.slice(0, 4) +
        " " +
        createDate.slice(11, 19)
    );
  }
  renderTestCaseFail(data) {
    if (data === "") {
      return String("Không có lỗi");
    }
    return data;
  }
  render() {
    return (
      <div class="container mt-5">
        {this.state.navigate?<Navigate to={this.state.href} replace={true} />:null}
        <div class="flex flex-col">
          <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div class="overflow-hidden">
                <table class="min-w-full">
                  <thead class="bg-white border-b">
                    <tr>
                      <th
                        scope="col"
                        class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        STT
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Tên bài
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Thời gian nộp
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Source code
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Kiểm thử
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Testcase lỗi
                      </th>
                    </tr>
                  </thead>
                  <tbody id="table">{this.state.content}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default History;
