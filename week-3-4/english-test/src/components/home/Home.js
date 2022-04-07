import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
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

export const Home = () => {
  const userCtx = useContext(UserContext);
  const { user } = userCtx;
  const { token, id } = user;
  const [categories, setCategories] = useState([]);
  const [listHistory, setListHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listLesson, setListLesson] = useState([]);
  const [onePageLesson, setOnePageLesson] = useState([]);
  const [pagination, setPagination] = useState({
    pageCount: 0,
    limit: 8,
  });
  const [activeCategory, setActiveCategory] = useState(0);

  useEffect(() => {
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
  }, []);

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
    const currentPage = data.selected + 1;
    const newList = listLesson.slice(
      (currentPage - 1) * pagination.limit,
      currentPage * pagination.limit
    );
    setOnePageLesson(newList);
  };

  return (
    <div className="home-page">
      {/* navbar */}
      <div className="info-navbar">
        <div className="container">
          <img src="../../../images/shin-1.jpg" alt="" />
          <div>{user.lastName + " " + user.firstName}</div>
        </div>
      </div>
      {/* body */}
      <div className="home-body ">
        <div className="left-container">
          <div className="user-name shadow">
            {user.lastName + " " + user.firstName}
          </div>
          <div className="shadow">
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
            <form className="col-6 search">
              <input type="text" placeholder="Search" />
              <button>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </form>
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
            nextClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </div>
        <div className="right-container ">
          <div className="center-item">History</div>
          <div className="list-history">
            {listHistory.map((history) => {
              return <ExamHistory key={history.id} history={history} />;
            })}
          </div>
        </div>
      </div>
      {loading && <LoadingIndicator />}
    </div>
  );
};
