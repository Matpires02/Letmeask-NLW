import { useHistory, useParams } from "react-router-dom"; // possibilita pegar os parametros da url
import logoImg from "../assets/images/logo.svg";
import { Button } from "../components/Button";
import { Question } from "../components/Question";
import { RoomCode } from "../components/RoomCode";
import { useRoom } from "../hooks/useRoom";
import { database } from "../services/firebase";
import "../styles/room.scss";
import deleteImg from "../assets/images/delete.svg";
import emptyRoom from '../assets/images/empty-questions.svg';
import alertClose from '../assets/images/x.svg';
import { useState } from "react";
import { Modal } from "../components/Modal";


type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const history = useHistory();
  const params = useParams<RoomParams>(); //funcao com parametro de tipagem
  const roomId = params.id;
  const { title, questions } = useRoom(roomId);
  const [showModal, setShowModal] = useState(false)


  async function handleEndRoom() {
    database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });
    history.push('/');
  }

  async function handleDeleteQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
  }

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={openModal}>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>


        <div className="question-list">
          {questions.map((question) => {
            // unico jeito de fazer for no react
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
              >
                <button
                  type='button'
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>
              </Question>
            );
          })}
          {!questions[0] &&
            <div className="empty">
              <img src={emptyRoom} alt="Sala vazia" />
              <h2>Nenhuma pergunta por aqui...</h2>
              <span>Envie o código desta sala para seus amigos e comece a responder perguntas!</span>
            </div>
          }
        </div>
      </main>
      {
        showModal ? <Modal img={alertClose} h2Text="Encerrar sala" spanText="Tem certeza que você deseja encerrar esta sala?">
          <button
            className='close'
            type='button'
            aria-label='Cancelar encerramento de sala'
            onClick={closeModal}
          >
            Cancelar
          </button>
          <button
            className='encerrar'
            type='button'
            aria-label='Encerrar sala'
            onClick={handleEndRoom}
          >
            Sim, encerrar
          </button>
        </Modal>
          : null
      }
    </div>
  );
}
