import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Saved({ Post }) {
  let navigate = useNavigate();
  const [Saved, setSaved] = useState();
  useEffect(() => {
    setSaved(Post);
  }, []);

  return (
    <>
      <div className="post-frame">
        {Saved &&
          Saved.map((e) => {
            return (
              <>
                <div key={e._id}>
                  <img
                    className="post-images"
                    src={e.Image}
                    alt=""
                    onClick={() => navigate(`/post/${e._id}`)}
                  />
                </div>
              </>
            );
          })}
      </div>
    </>
  );
}

export default Saved;
