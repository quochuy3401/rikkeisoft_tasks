import {
  faMagnifyingGlass,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/user";
import axiosInstance from "../../util/axiosInstance";
import "./home.css";
import { ExamHistory } from "../exam-history/ExamHistory";
import { LoadingIndicator } from "../../share/LoadingIndicator";
import { Category } from "../category/Category";
import { Lesson } from "../lesson/Lesson";
import ReactPagination from "react-paginate";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);
  const { user } = userCtx;
  const { token, id } = user;
  const [categories, setCategories] = useState([]);
  const [listHistory, setListHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listLesson, setListLesson] = useState([]);
  const [onePageLesson, setOnePageLesson] = useState([]);
  const [pagination, setPagination] = useState({
    pageCount: 0, // total number of pages
    limit: 8, //number of lessons in a page
  });
  // store index (position) of active category
  const [activeCategory, setActiveCategory] = useState(0);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get("/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axiosInstance
      .get(`/results/getByUser/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setListHistory(res.data.data.reverse());
      });

    axiosInstance
      .get(`/exams/getListExamByCategory/1`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const data = res.data.data;
        setListLesson(data);
        const _pageCount = Math.ceil(data.length / pagination.limit);
        setPagination((prevState) => ({ ...prevState, pageCount: _pageCount }));
        const newList = data.slice(0, pagination.limit);
        setOnePageLesson(newList);
      })
      .catch((err) => {
        console.log(err.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, token, pagination.limit]);

  const getListByCategory = (categoryId) => {
    setLoading(true);
    axiosInstance
      .get(`/exams/getListExamByCategory/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const data = res.data.data;
        setListLesson(data);
        const _pageCount = Math.ceil(data.length / pagination.limit);
        setPagination({ ...pagination, pageCount: _pageCount });
        const newList = data.slice(0, pagination.limit);
        setOnePageLesson(newList);
      })
      .catch((err) => {
        console.log(err.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handlePageClick = (data) => {
    // data.selected return index (position) of selected page number
    const currentPage = data.selected + 1;
    // get list to display in one page
    const newList = listLesson.slice(
      (currentPage - 1) * pagination.limit,
      currentPage * pagination.limit
    );
    setOnePageLesson(newList);
  };

  const handleLogOut = () => {
    localStorage.removeItem("userinfo");
    userCtx.setUser(null);
    navigate("/login");
  };

  return (
    <div className="home-page">
      {/* navbar */}
      <div className="info-navbar">
        <div className="container">
          <img src="../../../images/shin-1.jpg" alt="" />
          <div>{user.lastName + " " + user.firstName}</div>
          <button className="btn" type="button" onClick={handleLogOut}>
            Log out &nbsp;
            <FontAwesomeIcon icon={faRightFromBracket} />
          </button>
        </div>
      </div>
      {/* body */}
      <div className="home-body ">
        <div className="left-container">
          <div className="user-name shadow-fb box">
            {user.lastName + " " + user.firstName}
          </div>
          <div className="box shadow-fb">
            {categories.map((category, index) => {
              return (
                <Category
                  key={category.id}
                  index={index}
                  id={category.id}
                  categoryName={category.categoryName}
                  handleGetList={getListByCategory}
                  onActiveCategoryChange={{ activeCategory, setActiveCategory }}
                />
              );
            })}
          </div>
        </div>

        <div className="center-container 6">
          <div className="row">
            <div className="col-6">
              <form className="search box shadow-fb">
                <div>
                  <input type="text" placeholder="Search..." />
                  <button>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="list-lesson row">
            {onePageLesson.length > 0 ? (
              onePageLesson.map((lesson) => {
                return (
                  <Lesson
                    key={lesson.id}
                    id={lesson.id}
                    examName={lesson.examName}
                    totalPoint={lesson.totalPoint}
                    totalTime={lesson.totalTime}
                  />
                );
              })
            ) : (
              <div className="no-record center-item">No lesson</div>
            )}
          </div>
          <ReactPagination
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
            marginPagesDisplayed={3}
            pageCount={pagination.pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </div>

        <div className="right-container ">
          <div className="center-item box shadow-fb">History</div>
          <div className="list-history">
            {listHistory.map((history) => {
              return <ExamHistory key={history.id} history={history} />;
            })}
          </div>
        </div>
      </div>
      {loading && <LoadingIndicator size="2x" />}
    </div>
  );
};
