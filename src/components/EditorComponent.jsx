import { useEffect, useRef, useState, Fragment, Component } from "react";
import { useCodeMirror } from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import React from "react";
import axios from "axios";
import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { okaidia } from "@uiw/codemirror-theme-okaidia";
import { eclipse } from "@uiw/codemirror-theme-eclipse";
import "../style/IDE.css";
import { Tab, Listbox, Transition, Switch } from "@headlessui/react";
import {
  CheckIcon,
  SelectorIcon,
  CheckCircleIcon,
  ExclamationIcon,
} from "@heroicons/react/solid";
import {
  RefreshIcon,
  SaveIcon,
  SaveAsIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/outline";
import { StreamLanguage } from "@codemirror/stream-parser";
import { go } from "@codemirror/legacy-modes/mode/go";
import Split from "react-split";
import { Link, useLocation } from "react-router-dom";

// import CollapseButton from "./buttons/CollapseButton.jsx"

const URI1 = "http://128.199.172.148:4000/jobe/index.php/restapi/";
const URI2 = "http://104.248.145.103:4000/";

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      languages: [{}],
      testCases: [
        {
          ID: Number,
          Question_id: Number,
          Input: String,
          Output: String,
          accurate: String,
          output: String,
        },
      ],
      result: [{ accurate: String, output: String }],
      code: `#include <stdio.h>
      int main(){
        int a,b;
          scanf("%d %d",&a,&b);
          printf("%d",a+b);
      }`,
      enabled: false,
      theme: okaidia.extension,
      Question_id: sessionStorage.getItem("Question_id"),
      Question: [],
      selected: [],
    };
  }

  // classNames(...classes) {
  //   return classes.filter(Boolean).join("");
  // }
  // componentWillMount() {

  // }
  componentDidMount() {
    this.getLanguages();
    this.getTestCases(this.state.Question_id);
    var question = this.props.exercises.exercises.filter((exercise) => {
      // eslint-disable-next-line eqeqeq
      return exercise.Question_id == this.state.Question_id;
    });
    this.setState({ Question: question[0] });
  }
  getTestCases = (Question_id) => {
    console.log("Question_id", Question_id);
    axios
      .get(URI2 + "sampletestcases/getlistbyquestionid/" + Question_id)
      .then((response) => {
        this.setState({ testCases: response.data });
      });
  };
  renderTestCase() {
    return (
      <div class="flex pl-4 pt-4 items-start">
        <ul
          class="nav nav-pills flex flex-col flex-wrap list-none pl-0 mr-4"
          id="pills-tabVertical"
          role="tablist"
        >
          {this.state.testCases.map((testCases, Idx) => (
            <>
              {Idx === 0 ? (
                <li
                  key={Idx}
                  class="nav-item flex-grow text-center mb-2"
                  role="presentation"
                >
                  <a
                    href={`#pills-` + testCases.ID}
                    class="
                          nav-link
                          block
                          font-medium
                          text-xs
                          leading-tight
                          uppercase
                          rounded
                          w-36
                          h-10
                          focus:outline-none focus:ring-0
                          active
                        "
                    id={`pills-` + testCases.ID + `-tabVertical`}
                    data-bs-toggle="pill"
                    data-bs-target={`#pills-` + testCases.ID + `Vertical`}
                    role="tab"
                    aria-controls={`pills-` + testCases.ID + `Vertical`}
                    aria-selected="true"
                  >
                    Kiểm thử {Idx + 1} {renderConditionIcon(testCases.accurate)}
                  </a>
                </li>
              ) : (
                <li
                  key={Idx}
                  class="nav-item flex-grow text-center my-2"
                  role="presentation"
                >
                  <a
                    href={`#pills-` + testCases.ID}
                    class="
                          nav-link
                          block
                          font-medium
                          text-xs
                          leading-tight
                          uppercase
                          rounded
                          w-36
                          h-10
                          focus:outline-none focus:ring-0
                        "
                    id={`pills-` + testCases.ID + `-tabVertical`}
                    data-bs-toggle="pill"
                    data-bs-target={`#pills-` + testCases.ID + `Vertical`}
                    role="tab"
                    aria-controls={`pills-` + testCases.ID + `Vertical`}
                    aria-selected="false"
                  >
                    Kiểm thử {Idx + 1} {renderConditionIcon(testCases.accurate)}
                  </a>
                </li>
              )}
            </>
          ))}
        </ul>
        <div class="tab-content" id="pills-tabContentVertical">
          {this.state.testCases.map((testCases, Idx) => (
            <>
              {Idx === 0 ? (
                <div
                  key={Idx}
                  class="tab-pane fade show active text-white"
                  id={`pills-` + testCases.ID + `Vertical`}
                  role="tabpanel"
                  aria-labelledby={`pills-` + testCases.ID + `-tabVertical`}
                >
                  <h1>Đầu vào: {testCases.Input}</h1>
                  <h1>
                    Đầu ra thực tế: {testCases.output}
                    {/* {this.state.result.length > 0
                      ? this.state.result[Idx].output
                      : "null"} */}
                  </h1>
                  <h1>Đầu ra mong muốn: {testCases.Output}</h1>
                </div>
              ) : (
                <div
                  key={Idx}
                  class="tab-pane fade text-white"
                  id={`pills-` + testCases.ID + `Vertical`}
                  role="tabpanel"
                  aria-labelledby={`pills-` + testCases.ID + `-tabVertical`}
                >
                  <h1>Đầu vào: {testCases.Input}</h1>
                  <h1>
                    Đầu ra thực tế: {testCases.output}
                    {/* {this.state.result.length > 0
                      ? this.state.result[Idx].output
                      : "null"} */}
                  </h1>
                  <h1>Đầu ra mong muốn: {testCases.Output}</h1>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    );
  }
  getLanguages = () => {
    axios.get(URI1 + "languages").then((response) => {
      this.setState({ languages: response.data });
      this.setState({ selected: response.data[0] });
    });
  };

  // runTestingSampleTestCase= ()=> {
  //   axios.get(URI2 + "sampletestcases/getlist").then((response) => {
  //     var sampleTestCaseList = response.data;
  //     var sampleTestCases = sampleTestCaseList.filter(function (sampleTestCaseList) {
  //       return sampleTestCaseList.Question_id === questionID;
  //     });
  //     this.sampleTestingProcess(sampleTestCases);
  //   });
  // };
  // btnRun_Click() {
  //   disabledButton_Run(true);
  //   this.runTestingSampleTestCase(this.state.testCases,code,language);
  // }
  btnRun_Click(code, language) {
    for (let i = 0; i < this.state.testCases.length; i++) {
      var param = {
        run_spec: {
          language_id: language,
          sourcecode: code,
          input: this.state.testCases[i].Input,
        },
      };
      axios.post(URI1 + "runs", param).then((response) => {
        var result = response.data;
        console.log(result);
        this.checkSampleTestCase(this.state.testCases[i].Output, result, i);
        // console.log("Pass: " + count + "/" + sampleTestCases.length);
        // disabledButton_Run(false);
      });
      // this.submitCode_SampleTestCase(param, sampleTestCases, i);
    }
  }
  checkSampleTestCase(Output, result, i) {
    if (result.outcome === 15) {
      if (Output === result.stdout) {
        let temp = { accurate: "true", output: result.stdout };
        this.setState((prevState) => ({
          testCases: prevState.testCases.map((testCases, Idx) =>
            Idx === i
              ? { ...testCases, accurate: "true", output: result.stdout }
              : testCases
          ),
        }));
        this.setState({ result: [...this.state.result, temp] });
        this.setState({ count: this.state.count + 1 });
        console.log(this.state.testCases);
        console.log(this.state.result);
      } else {
        console.log("fail");
        let temp = { accurate: "false", output: result.stdout };
        this.setState((prevState) => ({
          testCases: prevState.testCases.map((testCases, Idx) =>
            Idx === i
              ? { ...testCases, accurate: "false", output: result.stdout }
              : testCases
          ),
        }));
        this.setState({ result: [...this.state.result, temp] });
        console.log(this.state.result);
      }
    } else if (result.outcome !== 15) {
      renderError(result);
    }
  }

  renderError(result) {
    var output = "";
    switch (result.outcome) {
      case 11:
        output = result.cmpinfo;
        break;
      case 12:
        output = result.stderr;
        break;
      case 13:
        output = "Time limit exceeded";
        break;
      case 17:
        output = "Memory limit exceeded";
        break;
      case 19:
        output = "Illegal system call";
        break;
      case 20:
        output = "Internal error";
        break;
      case 21:
        output = "Server overload";
        break;
      default:
        output = "Error";
        break;
    }
    // this.state
  }

  SelectLanguage() {
    return (
      <div className="mx-5 mt-2 w-40">
        <Listbox
          value={this.state.selected}
          onChange={(value) => this.setState({ selected: value })}
        >
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate">
                {this.state.selected[0] + " (" + this.state.selected[1] + ")"}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {this.state.languages.map((language, languageIdx) => (
                  <Listbox.Option
                    key={languageIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                      }`
                    }
                    value={language}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {language[0] + " (" + language[1] + ")"}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    );
  }

  TabsComponent() {
    return (
      <div className="sm:px-0">
        <ul
          class="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4"
          id="tabs-tabFill"
          role="tablist"
        >
          <li class="nav-item flex-auto text-center" role="presentation">
            <a
              href="#tabs-homeFill"
              class="
                nav-link
                w-full
                block
                font-medium
                text-xs
                leading-tight
                uppercase
                border-x-0 border-t-0 border-b-2 border-transparent
                px-6
                py-3
                my-2
                hover:border-transparent hover:bg-gray-100
                focus:border-transparent
                active
              "
              id="tabs-home-tabFill"
              data-bs-toggle="pill"
              data-bs-target="#tabs-homeFill"
              role="tab"
              aria-controls="tabs-homeFill"
              aria-selected="true"
            >
              Mô tả
            </a>
          </li>
          <li class="nav-item flex-auto text-center" role="presentation">
            <a
              href="#tabs-messagesFill"
              class="
                nav-link
                w-full
                block
                font-medium
                text-xs
                leading-tight
                uppercase
                border-x-0 border-t-0 border-b-2 border-transparent
                px-6
                py-3
                my-2
                hover:border-transparent hover:bg-gray-100
                focus:border-transparent
              "
              id="tabs-messages-tabFill"
              data-bs-toggle="pill"
              data-bs-target="#tabs-messagesFill"
              role="tab"
              aria-controls="tabs-messagesFill"
              aria-selected="false"
            >
              Lịch sử nộp
            </a>
          </li>
        </ul>
        <div class="tab-content" id="tabs-tabContentFill">
          <div
            class="tab-pane ml-4 fade show active"
            id="tabs-homeFill"
            role="tabpanel"
            aria-labelledby="tabs-home-tabFill"
          >
            <h3 className="text-base font-medium">{this.state.Question.Title}</h3>
            <p>{this.state.Question.Description}</p>
          </div>
          <div
            class="tab-pane fade"
            id="tabs-messagesFill"
            role="tabpanel"
            aria-labelledby="tabs-profile-tabFill"
          >
            Tab 3 content fill
          </div>
        </div>
      </div>
    );
  }

  SelectTheme() {
    return (
      <div className="mx-5 mt-3">
        <Switch
          checked={this.state.enabled}
          onChange={() => {
            this.setState({ enabled: !this.state.enabled });
            if (this.state.enabled) {
              this.setState({ theme: eclipse.extension });
            } else this.setState({ theme: okaidia.extension });
          }}
          className={`${this.state.enabled ? "bg-zinc-800-" : "bg-white"}
            relative inline-flex h-[30px] w-[66px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
          <span className="sr-only">Theme</span>
          <span
            aria-hidden="true"
            className={`${
              this.state.enabled ? "translate-x-9" : "translate-x-0"
            }
              pointer-events-none inline-block h-[26px] w-[26px] transform rounded-full bg-green-300 shadow-lg ring-0 transition duration-200 ease-in-out`}
          />
        </Switch>
      </div>
    );
  }
  render() {
    return (
      <section>
        {/* Breadcrumb Start */}
        <nav
          className="flex py-3 px-5 text-gray-700 bg-gray-50  border-2 border-gray-300 dark:bg-gray-800 dark:border-gray-700"
          aria-label="Breadcrumb"
        >
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link
                to="/"
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-sky-500 dark:text-gray-400 dark:hover:text-white"
              >
                Trang chủ
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"></path>
                </svg>
                <Link
                  to="/practice"
                  className="ml-1 text-sm font-medium text-gray-700 hover:text-sky-500 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                >
                  Luyện tập
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"></path>
                </svg>
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                  Tính tổng
                </span>
              </div>
            </li>
          </ol>
        </nav>
        {/* Breadcrumb End */}
        <Split
          className="split"
          sizes={[25, 75]}
          minSize={100}
          gutterSize={10}
          snapOffset={10}
          dragInterval={1}
        >
          {/* Tabs Start */}

          {this.TabsComponent()}
          {/* Tabs End */}
          {/* Code Editor Start  */}
          <div className="">
            {/* <div className="flex space-x-2">
            {testCaseResults.map((res, i) => {
              return (
                <div key={i}>
                  <div>{res === "True" ? "✅ passed" : "❌ failed"}</div>
                </div>
              );
            })}
          </div> */}
            <div className="bg-slate-800 flex h-14 selectLanguage">
              {this.SelectLanguage()}
              <div>{this.SelectTheme()}</div>
              <div className="float-right mr-5 pt-3 space-x-2 justify-right justify-items-center">
                <button
                  type="button"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                  onClick={() => {
                    this.setState({ code: "" });
                  }}
                  className="px-4 pt-2.5 pb-2 bg-blue-600 text-white font-medium text-xs leading-tight  uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex align-center"
                >
                  <RefreshIcon
                    className="h-4 w-4 mr-2 ml-0  text-white "
                    aria-hidden="true"
                  />
                  Làm mới
                </button>
              </div>
            </div>
            <div className="editor">
              <CodeMirror
                value={this.state.code}
                height="500px"
                // theme={oneDark}
                extensions={[javascript({ jsx: true })]}
                onChange={(value, viewUpdate) => {
                  this.setState({ code: value });
                  // console.log(code);
                }}
              />
            </div>
            <div className=" bg-slate-800 h-96">
              {this.renderTestCase()}
              {renderModal()}
              <div className="flex float-right px-4 py-4">
                <button
                  type="button"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                  className=" px-4 pt-2.5 pb-2 bg-blue-600 text-white font-medium text-xs leading-tight  uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex align-center"
                  onClick={() => {
                    this.btnRun_Click(this.state.code, this.state.selected[0]);
                  }}
                >
                  <ChevronDoubleRightIcon
                    className="h-4 w-4 mr-2 ml-0  text-white "
                    aria-hidden="true"
                  />
                  Chạy thử
                </button>
                <button
                  type="button"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                  className="ml-2 px-4 pt-2.5 pb-2 bg-lime-600 text-white font-medium text-xs leading-tight  uppercase rounded shadow-md hover:bg-lime-700 hover:shadow-lg focus:bg-lime-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-lime-700 active:shadow-lg transition duration-150 ease-in-out flex align-center"
                  // onClick={() => {
                  //   renderModal();
                  // }}
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <SaveIcon
                    className="h-4 w-4 mr-2 ml-0  text-white "
                    aria-hidden="true"
                  />
                  Nộp bài
                </button>
              </div>
            </div>
          </div>
          {/* Code Editor End  */}
        </Split>
      </section>
    );
  }
}

export default Editor;

// function Editor() {
//   const [code, setCode] = useState("console.log('hello world!');");
//   const [testCaseResults, setTestCaseResults] = useState([]);
//   const [collapsed, setCollapsed] = useState(null);
//   const [enabled, setEnabled] = useState(false);

//   return (

//   );
// }

// const Options = ({ children }) => {
//   return (
//     <div className="bg-gray-300 relative overflow-hidden">
//       <div className="absolute top-2 left-2 flex flex-col space-y-2">
//         {children}
//       </div>
//     </div>
//   );
// };

/* Start Helper Methods */
function renderError(result) {
  var output = "";
  if (result.outcome === 11) {
    output = result.cmpinfo;
  } else if (result.outcome === 12) {
    output = result.stderr;
  } else if (result.outcome === 13) {
    output = "Time limit exceeded";
  } else if (result.outcome === 17) {
    output = "Memory limit exceeded";
  } else if (result.outcome === 19) {
    output = "Illegal system call";
  } else if (result.outcome === 20) {
    output = "Internal error";
  } else if (result.outcome === 21) {
    output = "Server overload";
  }
  // document.getElementById("output").innerHTML = output;
}

function renderConditionIcon(cond) {
  if (cond === "true") {
    return <CheckCircleIcon className="text-green-600 inline h-5 w-5" />;
  } else if (cond === "false") {
    return <ExclamationIcon className="text-red-600 inline h-5 w-5" />;
  }
}
function disabledButton_Run(isDisabled) {
  if (isDisabled) {
    document.getElementById("btnRun").disabled = true;
    document.getElementById("btnRun").value = "  WAITING  ";
  } else {
    document.getElementById("btnRun").disabled = false;
    document.getElementById("btnRun").value = "Chạy thử";
  }
}

function disabledButton_Submit(isDisabled) {
  if (isDisabled) {
    document.getElementById("btnSubmit").disabled = true;
    document.getElementById("btnSubmit").value = "  WAITING  ";
  } else {
    document.getElementById("btnSubmit").disabled = false;
    document.getElementById("btnSubmit").value = "Nộp bài";
  }
}
function renderModal() {
  return (
    <div
      className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
      id="exampleModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog mt-36 relative w-auto pointer-events-none">
        <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
          <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
            <h5
              className="text-xl font-medium leading-normal"
              id="exampleModalLabel"
            >
              <SaveAsIcon className="text-green-600 inline h-8 w-8" />
              NỘP BÀI THÀNH CÔNG
            </h5>
            <button
              type="button"
              className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body relative p-4">Kết quả</div>

          <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-center p-4 border-t border-gray-200 rounded-b-md">
            <button
              type="button"
              class="inline-block px-6 py-2 border-2 border-blue-400 text-blue-400 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
              data-bs-dismiss="modal"
            >
              Ở LẠI
            </button>
            <Link to="/practice">
              <button
                type="button"
                class="inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out"
                data-bs-dismiss="modal"
              >
                TRỞ LẠI LUYỆN TẬP
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* End Helper Methods */
