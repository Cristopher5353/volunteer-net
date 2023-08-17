import React from 'react';
import { NavLink } from 'react-router-dom';
import moment from 'moment/moment';
import "moment/locale/es";
import "./Publication.css";

moment.locale("es")
moment.updateLocale('es', {
    relativeTime: {
        future: "in %s",
        past: "%s",
        s: 'a few seconds',
        ss: '%d segundos',
        m: "1 minuto",
        mm: "%d minutos",
        h: "1 hora",
        hh: "%d horas",
        d: "1 día",
        dd: "%d días",
        w: "1 semana",
        ww: "%d semanas",
        M: "1 mes",
        MM: "%d meses",
        y: "1 año",
        yy: "%d años"
    }
});

export const Publication = ({ publication }) => {
    return (
        <div className="card gedf-card mb-3 mt-3">
            <div className="card-header">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="mr-2">
                            <img className="rounded-circle" width="45" src="https://picsum.photos/50/50" alt="" />
                        </div>
                        <div className="ml-2">
                            <div className="h5 m-0 ms-2"><NavLink to={`/principal/perfil/${publication.userId}`}>@{publication.user}</NavLink></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className="text-muted h7 mb-2"> <i className="fa fa-clock-o"></i>{moment(publication.createdAt).fromNow()}</div>
                <p className="card-text">
                    {publication.description}
                </p>
                {
                    publication.images.length > 0 &&
                    <div className="card-body" style={{height : "350px", width : "80%", margin : "auto"}}>
                        <swiper-container class="mySwiper" pagination="true" pagination-clickable="true" navigation="true" space-between="10"
                            loop="true">
                            {publication.images.map(image => <swiper-slide key={image.id}><img src={image.url}/></swiper-slide>)}
                        </swiper-container>
                    </div>
                }
            </div>
            <div className="card-footer">
                <a href="#" className="card-link"><i className="fa fa-gittip"></i> Like</a>
                <a href="#" className="card-link"><i className="fa fa-comment"></i> Comment</a>
                <a href="#" className="card-link"><i className="fa fa-mail-forward"></i> Share</a>
            </div>
        </div>
    )
}