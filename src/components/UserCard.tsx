import React from "react";
import { useDispatch } from "react-redux";
import { usersActions } from "../store/users";
import { User } from "../interfaces/IUser";

interface Props {
  users: User[];
}

export const UserCard = ({ users }: Props) => {
  const dispatch = useDispatch();

  const removeUser = (id: number): void => {
    dispatch(usersActions.removeUser(id));
  };

  if (!users) {
    return <>Result not found!</>;
  }

  return (
    <div className="row gx-3 gy-3 card-item">
      {users.map((user: User) => (
        <div
          className="col col-sm-12 col-md-3"
          key={user.id}
          data-testid="user-card"
        >
          <div className="col col-12 bg-white shadow gy-2 rad rounded-2">
            <div className="col-12">
              <img
                className="img-fluid card-item-img col-12 card__img ratio-16x9 rounded-top"
                src={user.avatar_url}
                alt={user.node_id}
              />
            </div>

            <div className="px-2 py-2">
              <div className="card-item__name fs-4">{user.login}</div>
              <a
                data-testid="user-profile-link"
                target="_blank"
                className="col col-12 d-block card-item__url small"
                href={user.html_url}
                rel="noreferrer"
              >
                {" "}
                User Profile{" "}
              </a>
              <hr />

              <div className="d-flex justify-content-end">
                <button
                  data-testid="delete-btn"
                  className="btn small text-muted"
                  onClick={() => removeUser(user.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
