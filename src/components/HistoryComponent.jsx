import { Component } from "react";
import { baseUrl } from "../shared/baseUrl";
import axios from "axios";

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // componentDidMount() {
  //   this.getHistory();
  // }
  getHistory() {
    axios
      .get(
        baseUrl +
          "historypractices/gethistorypractice/" +
          sessionStorage.getItem("Student_Id")
      )
      .then((response) => {
        var data = response.data;
        return this.renderHistory(data);
      });
  }
  renderHistory(data) {
    var content = [];
    for (let i = 0; i < data.length; i++) {
      content.push(
        <tr class="align-middle alert border-bottom" role="alert">
          <td>{i}</td>
          <td>
            <div>{data[i].Question_description}</div>
          </td>
          <td>
            <div class="fw-600">
              {this.renderCreateDate(data[i].Submit_date)}
            </div>
          </td>
          <td>{data[i].Source_code}</td>
          <td>{data[i].Pass}</td>
          <td>{this.renderTestCaseFail(data[i].Testcase_fail)}</td>
        </tr>
      );
    }
    return content;
  }
  renderTestCaseFail(data) {
    if (data == "") {
      return String("Không có lỗi");
    }
    return data;
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
  render() {
    return (
      <div class="container mt-5">
        <div class="table-wrap">
          <table class="table table-responsive table-borderless">
            <thead>
              <th>STT</th>
              <th>&nbsp;</th>
              <th>Tên bài</th>
              <th>Thời gian nộp</th>
              <th>Source code</th>
              <th>Kiểm thử</th>
              <th>Testcase lỗi</th>
            </thead>
            <tbody id="table">
              {/* <tr class="align-middle alert border-bottom" role="alert">
                <td>1</td>
                <td class="text-center"></td>
                <td>
                  <div>Tính tổng a+b</div>
                </td>
                <td>
                  <div class="fw-600">03/07/2022</div>
                </td>
                <td>
                  <button className="text-[#5089eb]">Xem chi tiết</button>
                </td>
                <td>10/10</td>
                <td>Không có Testcase lỗi</td>
              </tr>
              <tr class="align-middle alert border-bottom" role="alert">
                <td>2</td>
                <td class="text-center"></td>
                <td>
                  <div>Tìm hiệu a-b</div>
                </td>
                <td>
                  <div class="fw-600">02/07/2022</div>
                </td>
                <td>
                  <button className="text-[#5089eb]">Xem chi tiết</button>
                </td>
                <td>10/10</td>
                <td>Không có Testcase lỗi</td>
              </tr>
              <tr class="align-middle alert border-bottom" role="alert">
                <td>3</td>
                <td class="text-center"></td>
                <td>
                  <div>Tìm tích a*b</div>
                </td>
                <td>
                  <div class="fw-600">02/07/2022</div>
                </td>
                <td>
                  <button className="text-[#5089eb]">Xem chi tiết</button>
                </td>
                <td>10/10</td>
                <td>Không có Testcase lỗi</td>
              </tr>
              <tr class="align-middle alert border-bottom" role="alert">
                <td>4</td>
                <td class="text-center"></td>
                <td>
                  <div>Tìm thương a/b</div>
                </td>
                <td>
                  <div class="fw-600">03/07/2022</div>
                </td>
                <td>
                  <button className="text-[#5089eb]">Xem chi tiết</button>
                </td>
                <td>10/10</td>
                <td>Không có Testcase lỗi</td>
              </tr>
              <tr class="align-middle alert border-bottom" role="alert">
                <td>5</td>
                <td class="text-center"></td>
                <td>
                  <div>Tìm 5 số nguyên tố đầu tiên</div>
                </td>
                <td>
                  <div class="fw-600">03/07/2022</div>
                </td>
                <td>
                  <button className="text-[#5089eb]">Xem chi tiết</button>
                </td>
                <td>10/10</td>
                <td>Không có Testcase lỗi</td>
              </tr> */}
              {this.getHistory()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default History;
