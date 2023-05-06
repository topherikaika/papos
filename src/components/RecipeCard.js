import Axios from "axios";
import React, { useState } from "react";

function RecipeCard(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftName, setDraftName] = useState("");
  const [file, setFile] = useState();
  const [draftTypes, setDraftTypes] = useState("");

  async function submitHandler(e) {
    e.preventDefault();
    setIsEditing(false);
    props.setRecipes(prev =>
      prev.map(function (recipe) {
        if (recipe._id == props.id) {
          return { ...recipe, name: draftName, type: draftType };
        }
        return recipe;
      })
    );
    const data = new FormData();
    if (file) {
      data.append("photo", file);
    }
    data.append("_id", props.id);
    data.append("name", draftName);
    data.append("type", draftType);
    const newPhoto = await Axios.post("/update-recipe", data, { headers: { "Content-Type": "multipart/form-data" } });
    if (newPhoto.data) {
      props.setRecipes(prev => {
        return prev.map(function (recipe) {
          if (recipe._id == props.id) {
            return { ...recipe, photo: newPhoto.data };
          }
          return recipe;
        });
      });
    }
  }

  return (
    <div className="card">
      <div className="our-card-top">
        {isEditing && (
          <div className="our-custom-input">
            <div className="our-custom-input-interior">
              <input onChange={e => setFile(e.target.files[0])} className="form-control form-control-sm" type="file" />
            </div>
          </div>
        )}
        <img src={props.photo ? `/uploaded-photos/${props.photo}` : "/fallback.png"} className="card-img-top" alt={`${props.type} named ${props.name}`} />
      </div>
      <div className="card-body">
        {!isEditing && (
          <>
            <h4>{props.name}</h4>
            <p className="text-muted small">{props.type}</p>
            {!props.readOnly && (
              <>
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setDraftName(props.name);
                    setDraftType(props.type);
                    setFile("");
                  }}
                  className="btn btn-sm btn-primary"
                >
                  Edit
                </button>{" "}
                <button
                  onClick={async () => {
                    const test = Axios.delete(`/recipe/${props.id}`);
                    props.setRecipes(prev => {
                      return prev.filter(recipe => {
                        return recipe._id != props.id;
                      });
                    });
                  }}
                  className="btn btn-sm btn-outline-danger"
                >
                  Delete
                </button>
              </>
            )}
          </>
        )}
        {isEditing && (
          <form onSubmit={submitHandler}>
            <div className="mb-1">
              <input autoFocus onChange={e => setDraftName(e.target.value)} type="text" className="form-control form-control-sm" value={draftName} />
            </div>
            <div className="mb-2">
              <input onChange={e => setDraftType(e.target.value)} type="text" className="form-control form-control-sm" value={draftType} />
            </div>
            <button className="btn btn-sm btn-success">Save</button>{" "}
            <button onClick={() => setIsEditing(false)} className="btn btn-sm btn-outline-secondary">
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default RecipeCard;
