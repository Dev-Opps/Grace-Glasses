import React from 'react';
import { Link } from 'react-router-dom';
import { SearchBarContainer } from '../';

export function GlassesCardView({ glasses }) {
    return (
      <div className="col-4">
        <div className="card" id="card">
          <img
            className="card-img-top"
            id="student-card-picture"
            src={glasses.imageUrl}
            alt="Card image cap"
          />
          <div className="card-body text-center">
            <h5 className="card-title">{glasses.title}</h5>
            <h5 className="card-description">{glasses.description}</h5>
            <Link
              to={{
                pathname: `/glasses/${glasses.id}`,
                state: glasses.id
              }}
            >
              <button type="submit" className="btn btn-primary" id="card-visit">
                View glasses
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
}

export function SelectCategoryMenu({handleSelect, isAdmin}) {
      // If we have tim to fix
      const addGlassesBtn = isAdmin ? (
          <button type="button" className="btn btn-primary"> + Add Item + </button>
        ) : null;
      return (
          <div className="row add-row">
            <form>
              <div className="form-group">
                <select
                  className="form-control"
                  aria-labelledby="dropdownMenuButton"
                  onChange={handleSelect}
                >
                  <option className="dropdown-item" href="#" value="">
                    All
                  </option>
                  <option className="dropdown-item" href="#" value="Men">
                    Men
                  </option>
                  <option className="dropdown-item" href="#" value="Women">
                    Women
                  </option>
                  <option className="dropdown-item" href="#" value="Kids">
                    Kids
                  </option>
                </select>
              </div>
              <SearchBarContainer />
            </form>
            <Link to="/admin/form">{addGlassesBtn}</Link>
          </div>
      )
  }
