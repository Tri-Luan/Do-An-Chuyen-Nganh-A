import { Component } from "react";

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }

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
              <tr class="align-middle alert border-bottom" role="alert">
                <td>1</td>
                <td class="text-center">
                </td>
                <td>
                  <div>Tính tổng a+b</div>
                </td>
                <td>
                  <div class="fw-600">
                    03/07/2022
                  </div>
                </td>
                <td><button className="text-[#5089eb]">Xem chi tiết</button></td>
                <td>10/10</td>
                <td>Không có Testcase lỗi</td>
              </tr>
              <tr class="align-middle alert border-bottom" role="alert">
                <td>2</td>
                <td class="text-center">
                </td>
                <td>
                  <div>Tìm hiệu a-b</div>
                </td>
                <td>
                  <div class="fw-600">
                    02/07/2022
                  </div>
                </td>
                <td><button className="text-[#5089eb]">Xem chi tiết</button></td>
                <td>10/10</td>
                <td>Không có Testcase lỗi</td>
              </tr>
              <tr class="align-middle alert border-bottom" role="alert">
                <td>3</td>
                <td class="text-center">
                </td>
                <td>
                  <div>Tìm tích a*b</div>
                </td>
                <td>
                  <div class="fw-600">
                    02/07/2022
                  </div>
                </td>
                <td><button className="text-[#5089eb]">Xem chi tiết</button></td>
                <td>10/10</td>
                <td>Không có Testcase lỗi</td>
              </tr>
              <tr class="align-middle alert border-bottom" role="alert">
                <td>4</td>
                <td class="text-center">
                </td>
                <td>
                  <div>Tìm thương a/b</div>
                </td>
                <td>
                  <div class="fw-600">
                    03/07/2022
                  </div>
                </td>
                <td><button className="text-[#5089eb]">Xem chi tiết</button></td>
                <td>10/10</td>
                <td>Không có Testcase lỗi</td>
              </tr>
              <tr class="align-middle alert border-bottom" role="alert">
                <td>5</td>
                <td class="text-center">
                </td>
                <td>
                  <div>Tìm 5 số nguyên tố đầu tiên</div>
                </td>
                <td>
                  <div class="fw-600">
                    03/07/2022
                  </div>
                </td>
                <td><button className="text-[#5089eb]">Xem chi tiết</button></td>
                <td>10/10</td>
                <td>Không có Testcase lỗi</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default History;
