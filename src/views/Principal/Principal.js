import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { decodeToken } from '../../custom/decodeToken';
import { Menu } from './components/Menu/Menu';

export const Principal = () => {
    /*const getChatsByUser = async () => {
      let token = localStorage.getItem("token");

      try {
          let fetchGetChatsByUser = await fetch(
              `http://localhost:8080/api/users/chats`,
              {
                  method: "GET",
                  headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                  },
              }
          );

          let jsonFetchGetChatsByUser = await fetchGetChatsByUser.json();
          let status = jsonFetchGetChatsByUser.status;

          if (status === 200) {

              const socket = new SockJS("http://localhost:8080/ws");
              const stompClient = Stomp.over(socket);

              jsonFetchGetChatsByUser.data.forEach(chat => {
                  stompClient.connect({
                      Authorization : `Bearer ${localStorage.getItem("token")}`
                  }, () => {
                      stompClient.subscribe(`/topic/${chat.id}`, (response) => {
                          const messageResponse = JSON.parse(response.body);
                          console.log(messageResponse);
                      })
                  });
              });

          } else {
              alert("Error al traer los chats del usuario");
          }

      } catch (error) {
          alert("Error, vuelva a intentarlo más tarde");
      }
  }*/

    useEffect(() => {
        //getChatsByUser();
        /*const socket = new SockJS('http://localhost:8080/ws');
        const stompClient = Stomp.over(socket);

        let username = decodeToken().sub;

        stompClient.connect({
            Authorization : `Bearer ${localStorage.getItem("token")}`
        }, () => {
            stompClient.subscribe(`/user/${username}/queue/messages`, (message) => {
                //const messageResponse = JSON.parse(message.body);
                console.log(message.body);
            });
        });*/
    }, [])

    return (
        <div>
            <div className="d-flex">
                <div className="d-flex flex-column justify-content-between" style={{ backgroundColor: '#222', height : "100vh", width : "6vw", position : "fixed"}}>
                    <Menu />
                </div>
                <div style={{ height : "100vh",  padding : 0, width : "95vw", marginLeft : "6vw"}}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
