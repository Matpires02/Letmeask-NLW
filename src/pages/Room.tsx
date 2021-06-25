import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // possibilita pegar os parametros da url
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import '../styles/room.scss';

type RoomParams ={
  id:string;
}

type FirebaseQuestions = Record<string,{
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
}>

type Questions = {
  id: string;
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
}

export function Room() {
  const {user} = useAuth();
  const params = useParams<RoomParams>();//funcao com parametro de tipagem
  const roomId = params.id;
  const [newQuestion, setNewQuestion] = useState('');
  const [questions, setQuestions] = useState<Questions[]>([]);
  const [title, setTitle] = useState("")

  useEffect(() =>{
    const roomRef = database.ref(`rooms/${roomId}`);//pega a sala

    roomRef.on('value', room => {
      
    const databaseRoom = room.val();
    const firebaseQuestions: FirebaseQuestions= databaseRoom.questions ?? {};
      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
        }
      })
      setTitle(databaseRoom.title)
      setQuestions(parsedQuestions)
    }) // ouve as informaçoes do campo

  } , [roomId]); // executa 1 vez quando é carregado


  async function handleSendQuestion(event: FormEvent){
    event.preventDefault();
    if(newQuestion.trim() === "") {return;}
    if(!user){throw new Error("Você precisa se logar primeiro")}

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false, // se esta em destaque
      isAnswered: false // se ja foi respondida
    }

    await database.ref(`rooms/${roomId}/questions`).push(question); // colocando pergunta dentro da sala lá no banco

    setNewQuestion('');// coloca estado do textarea como vazio
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <RoomCode code={roomId} />
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="O que você quer perguntar?"
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
          />
          <div className="form-footer">
            { user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
            )}
            <Button disabled={!user} type="submit">Enviar Pergunta</Button>
          </div>
        </form>

        {JSON.stringify(questions)}
      </main>
    </div>
  );
}