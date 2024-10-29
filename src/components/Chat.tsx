import React, { useEffect, useRef } from 'react';
import { io } from 'socket.io-client'

const Chat: React.FC = () => {
    const messagesRef = useRef<HTMLUListElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    
    useEffect(() => {
        const loadSocketIO = async () => {
            const socket = io("http://localhost:3000", {
                auth: {
                    serverOffset: 0,
                },
            });

            socket.on("connect", () => {
                console.log("Conectado al socket");
            });

            //Show messages on chat
            socket.on("chat message", (msg: string) => {
                console.log("mensaje: ", msg);
                if (messagesRef.current) {
                    const item = document.createElement('li');
                    item.textContent = msg;
                    messagesRef.current.appendChild(item);
                    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
                }
            });

            //Clean the chat
            const deleteButtons = document.getElementsByClassName("delete-button");
            for (let i = 0; i < deleteButtons.length; i++) {
                deleteButtons[i].addEventListener("click", () => {
                    socket.emit("vaciar tabla");
                    const items = messagesRef.current?.children;
                    if (!items || items.length === 0) {
                        console.log("El chat ya está vacío.");
                    } else {
                        Array.from(items).forEach(item => item.remove());
                    }
                });
            }

            //Send messages
            const form = document.querySelector("form");
            if (form && inputRef.current) {
                form.addEventListener("submit", (e) => {
                    e.preventDefault();

                    if (inputRef.current && inputRef.current.value.trim()) {
                        socket.emit("chat message", inputRef.current.value); // Send
                        inputRef.current.value = ""; //Clean input after send
                        console.log("Mensaje enviado y almacenado");
                    } else {
                        console.log("No se puede enviar un mensaje vacío.");
                    }
                });
            } else {
                console.error("El formulario o el campo de entrada no se encontraron.");
            }
        };
        loadSocketIO();
    }, []);

    return (
  <>
            <section className='chat'>
                    <button className="delete-button">BORRAR CHAT</button>
                    <ul className="messages" ref={messagesRef}></ul>
                <form className='form'>
                    <input ref={inputRef} className="input" type="text" placeholder="Escribe tu mensaje" />
                    <button type="submit">Enviar</button>
                </form>
            </section>
           
            <footer className='footer'>
                <p>Desarrollado por <strong>Sergio Cerrillo</strong> © 2024</p>
            </footer>
    </>
    
    );
};

export default Chat;