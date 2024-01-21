import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Translate } from "../../Enums/Tranlate";
import "./style.scss";

const Pagination = ({
  setData,
  service,
  shouldUpdate,
  isDeleted,
  setHasData,
  setLoading,
  type,
  search,
}) => {
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = useState(1);
  const [pageShow, setPageShow] = useState(1);
  const lang = useSelector((state) => state.auth.lang);

  useEffect(() => {
    setLoading(true);
    let params = {
      offset: (page - 1) * 15,
      limit: 15,
      isDeleted: isDeleted,
    };
    if (!!type) params["type"] = type;
    if (!!search) params["search"] = search;

    service?.getList({ ...params }).then((res) => {
      console.log(res);
      if (res?.status === 200) {
        setData([...res.data?.meta?.data]);
        let total = Math.ceil(res.data?.meta?.totalLength / 15);
        setTotalPages(total);
        if (res.data?.meta?.totalLength > 0) {
          setHasData(1);
        } else {
          setHasData(0);
        }
      }
      setLoading(false);
    });
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [page, isDeleted, shouldUpdate, search]);

  useEffect(() => {
    setPage(1);
  }, [isDeleted, shouldUpdate]);

  if (totalPages > 1) {
    return (
      <Row className="pagination mt-3 px-2">
        <Col md={12} className="text-center">
          <div className="filter-pagination  mt-3">
            <button
              className="previous-button"
              onClick={() => {
                setPage((prev) => parseInt(prev) - 1);
                setPageShow(page - 1);
              }}
              disabled={parseInt(page) === 1}
            >
              <i className="la la-arrow-left"></i> {Translate[lang]?.previous}
            </button>
            <div>{}</div>
            <button
              className="next-button"
              onClick={() => {
                setPage((prev) => parseInt(prev) + 1);
                setPageShow(page + 1);
              }}
              disabled={parseInt(page) === totalPages}
            >
              {Translate[lang]?.next} <i className="la la-arrow-right"></i>
            </button>
          </div>
        </Col>
      </Row>
    );
  }
};

export default Pagination;
