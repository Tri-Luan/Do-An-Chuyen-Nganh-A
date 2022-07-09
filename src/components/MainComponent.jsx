import React, { Component } from "react";
import { Route, Routes} from "react-router-dom";

// redux
import { connect } from "react-redux";
import { addExercises, fetchExercises } from "../redux/ActionCreators";

import Header from "./HeaderComponent";
import ExerciseListComponent from "./ExerciseListComponent";
import Home from "./HomeComponent";
import Editor from "./EditorComponent";
import Footer from "./FooterComponent";
import Post from "./PostComponent";
import History from "./HistoryComponent";
import Result from "./ResultComponent";
import Login from "./LoginComponent";
import Register from "./RegisterComponent";
import { AuthProvider } from "./auth";

const mapStateToProps = (state) => {
  return {
    exercises: state.exercises,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addExercises: (
    Author_id,
    Question_id,
    Title,
    Topic,
    Level,
    Description,
    CreateDate
  ) =>
    dispatch(
      addExercises(
        Author_id,
        Question_id,
        Title,
        Topic,
        Level,
        Description,
        CreateDate
      )
    ),
  fetchExercises: () => dispatch(fetchExercises()),
});

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        Author_id: Number,
        CreateDate: "",
        Description: "",
        Level: "",
        Question_id: Number,
        Title: "",
        Topic: "",
      },
      Access_token: sessionStorage.getItem("Access_token"),
    };
  }
  componentDidMount() {
    this.props.fetchExercises();
  }
  render() {
    const HomePage = () => {
      return (
        <div>
          <Header />
          <Home />
          <Footer />
        </div>
      );
    };
    const PracticePage = () => {
      return (
        <div>
          <Header />
          <ExerciseListComponent exercises={this.props.exercises} />
          <Footer />
        </div>
      );
    };
    const PostPage = () => {
      return (
        <div>
          <Header />
          <Post />
          <Footer />
        </div>
      );
    };
    const EditorPage = () => {
      return <Editor exercises={this.props.exercises} />;
    };
    const HistoryPage = () => {
      return (
        <div>
          <Header />
          <History />
          <Footer />
        </div>
      );
    };
    const ResultPage = () => {
      return (
        <div>
          <Header />
          <Result />
          <Footer />
        </div>
      );
    };
    const LoginPage = () => {
      return (
        <div>
          {/* <Header />
          <Result />
          <Footer /> */}
          <Login />
        </div>
      );
    };
    const RegisterPage = () => {
      return (
        <div>
          {/* <Header />
          <Result />
          <Footer /> */}
          <Register />
        </div>
      );
    };
    return (
      <div>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/practice" element={<PracticePage />}></Route>
            <Route path="/post" element={<PostPage />}></Route>
            <Route path="/history" element={<HistoryPage />}></Route>
            <Route path="/result" element={<ResultPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path="/editor/:exerciseID" element={<EditorPage />}></Route>
          </Routes>
        </AuthProvider>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);
