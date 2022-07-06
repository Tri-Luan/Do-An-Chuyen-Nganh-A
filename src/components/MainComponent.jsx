import React, { Component } from "react";
import { Route, Router, Switch, Routes } from "react-router-dom";

// import Dishdetail from "./DishdetailComponent";

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
    };
  }
  componentDidMount() {
    this.props.fetchExercises();
  }
  callbackFunction = (childData) => {
    this.setState({ data: childData[0] });
    console.log(childData);
    console.log(this.state.data);
  };

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
          <ExerciseListComponent
            exercises={this.props.exercises}
            mainCallback={this.callbackFunction}
          />
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
          {/* <Footer /> */}
        </div>
      );
    };
    // <Home
    // dish={this.props.dishes.dishes.filter((dish) => dish.featured === true)[0]}
    // dishesLoading={this.props.dishes.isLoading}
    // dishesErrMess={this.props.dishes.errMess}
    // promotion={this.props.promotions.promotions.filter((promo) => promo.featured === true)[0]}
    // promoLoading={this.props.promotions.isLoading}
    // promoErrMess={this.props.promotions.errMess}
    // leader={this.props.leaders.filter((leader) => leader.featured === true)[0]} />

    // const DishdetailPage = ({ match }) => {
    //   const dishId = parseInt(match.params.dishId);
    //   return (
    //     <Dishdetail
    //       dish={this.props.dishes.dishes[dishId]}
    //       isLoading={this.props.dishes.isLoading}
    //       errMess={this.props.dishes.errMess}
    //       comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)}
    //       addComment={this.props.addComment}
    //       commentsErrMess={this.props.comments.errMess} />
    //   );
    // }
    return (
      <div>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/practice" element={<PracticePage />}></Route>
          <Route path="/post" element={<PostPage />}></Route>
          <Route path="/history" element={<HistoryPage />}></Route>
          <Route path="/editor/:exerciseID" element={<EditorPage />}></Route>
        </Routes>
        {/* <Footer /> */}
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);
