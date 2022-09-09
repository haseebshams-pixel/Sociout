import React from "react";
import Lottie from "react-lottie";

function Animation({ Pic, Message, ischat, isConvs }) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Pic,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className={`${isConvs && "mt-5"} `}>
      <Lottie
        isClickToPauseDisabled
        options={defaultOptions}
        isStopped={false}
        isPaused={false}
        height={!isConvs ? "300px" : "100px"}
        width={!isConvs ? "400px" : "100px"}
      />
      {Message &&
        (isConvs ? (
          <h5 className="text-secondary text-center mt-4">{Message}</h5>
        ) : (
          <h4 className="text-secondary text-center mt-4">{Message}</h4>
        ))}
    </div>
  );
}

export default Animation;
