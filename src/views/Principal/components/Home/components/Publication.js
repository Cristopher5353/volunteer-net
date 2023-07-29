import React from 'react';

export const Publication = ({publication}) => {
    return (
        <div className="card gedf-card mb-3">
            <div className="card-header">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="mr-2">
                            <img className="rounded-circle" width="45" src="https://picsum.photos/50/50" alt="" />
                        </div>
                        <div className="ml-2">
                            <div className="h5 m-0 ms-2">{publication.user}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className="text-muted h7 mb-2"> <i className="fa fa-clock-o"></i>10 min ago</div>
                <p className="card-text">
                    {publication.description}
                </p>
            </div>
            <div className="card-footer">
                <a href="#" className="card-link"><i className="fa fa-gittip"></i> Like</a>
                <a href="#" className="card-link"><i className="fa fa-comment"></i> Comment</a>
                <a href="#" className="card-link"><i className="fa fa-mail-forward"></i> Share</a>
            </div>
        </div>
    )
}