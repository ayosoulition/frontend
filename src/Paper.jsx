import { forwardRef, useId } from "react";
import Page from "./Page";

function Paper(
  { handleNext, zindex, pageNumber, items, handleBack, setOrder, order },
  ref,
) {
  const id = useId();
  return (
    <div className="book-page page-right" style={{ zIndex: zindex }} ref={ref}>
      {items.map((item, index) => {
        return (
          <Page
            key={`${id}-${item?.id}`}
            order={order}
            setOrder={setOrder}
            pageDir={index === 0 ? "front" : "back"}
            item={item}
            pageNumber={pageNumber}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        );
      })}
    </div>
  );
}

export default forwardRef(Paper);
