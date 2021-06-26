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
  const [showConfirm, setConfirm] = useState(false);
  const [idQuestion, setIdQuestion] = useState('');


  async function handleEndRoom() {
    database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });
    history.push('/');
  }

  async function handleDeleteQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    closeExclude();
  }

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  
  function openExclude(id:string) {
    setIdQuestion(id);
    setConfirm(true);
  }

  function closeExclude() {
    setIdQuestion('');
    setConfirm(false);
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
                  //onClick={() => handleDeleteQuestion(question.id)}
                  onClick={() => openExclude(question.id)}
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

{
        showConfirm ? <Modal img='' svg={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 5.99988H5H21" stroke="#737380" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8 5.99988V3.99988C8 3.46944 8.21071 2.96074 8.58579 2.58566C8.96086 2.21059 9.46957 1.99988 10 1.99988H14C14.5304 1.99988 15.0391 2.21059 15.4142 2.58566C15.7893 2.96074 16 3.46944 16 3.99988V5.99988M19 5.99988V19.9999C19 20.5303 18.7893 21.039 18.4142 21.4141C18.0391 21.7892 17.5304 21.9999 17 21.9999H7C6.46957 21.9999 5.96086 21.7892 5.58579 21.4141C5.21071 21.039 5 20.5303 5 19.9999V5.99988H19Z" stroke="#737380" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        } h2Text="Excluir pergunta" spanText="Tem certeza que você deseja excluir esta pergunta?">
          <button
            className='close'
            type='button'
            aria-label='Cancelar encerramento de sala'
            onClick={closeExclude}
          >
            Cancelar
          </button>
          <button
            className='encerrar'
            type='button'
            aria-label='Encerrar sala'
            onClick={() => handleDeleteQuestion(idQuestion)}
          >
            Sim, excluir
          </button>
        </Modal>
          : null
      }
    </div>
  );
}
