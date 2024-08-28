import { Pagination } from "react-bootstrap";
import "./pagination.scss";

const CustomPagination = ({
  activePage,
  onPageChange,
  pageLength,
  totalData,
}) => {
  const pageCount = Math.ceil(totalData / pageLength);

  return (
    <div
      className="pagination"
      style={{ margin: "0 auto", justifyContent: "center" }}
    >
      <Pagination className="justify-content-between w-100 px-4 align-items-center">
        <Pagination.Prev
          disabled={activePage === 1}
          onClick={() => onPageChange(activePage - 1)}
        >
          &#x3c; Prev
        </Pagination.Prev>
        <div className="pagination_numbers">
          {pageCount <= 8 ? (
            Array.from({ length: pageCount }).map((_, index) => (
              <Pagination.Item
                key={index}
                active={index + 1 === activePage}
                onClick={() => onPageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))
          ) : (
            <>
              {activePage > 4 && (
                <>
                  <Pagination.Item
                    onClick={() => onPageChange(1)}
                  >
                    {1}
                  </Pagination.Item>
                  <Pagination.Ellipsis disabled />
                </>
              )}
              {Array.from({ length: pageCount }).map((_, index) => {
                if (
                  index === activePage - 2 ||
                  index === activePage - 1 ||
                  index === activePage ||
                  index === activePage + 1 ||
                  index === activePage + 2
                ) {
                  return (
                    <Pagination.Item
                      key={index}
                      active={index + 1 === activePage}
                      onClick={() => onPageChange(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  );
                } else {
                  return null;
                }
              })}
              {activePage < pageCount - 3 && (
                <>
                  <Pagination.Ellipsis disabled />
                  <Pagination.Item
                    onClick={() => onPageChange(pageCount)}
                  >
                    {pageCount}
                  </Pagination.Item>
                </>
              )}
            </>
          )}
        </div>
        <Pagination.Next
          disabled={activePage === pageCount}
          onClick={() => onPageChange(activePage + 1)}
        >
          Next &#x3e;
        </Pagination.Next>
      </Pagination >
    </div >
  );
};

export default CustomPagination;
