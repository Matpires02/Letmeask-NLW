import './styles.scss';
import {ReactNode} from 'react';
import classNames from 'classnames';

type QuestionProps ={
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode; //pode ser qualquer conteudo html
  isAnswered?: boolean;
  isHighlighted?: boolean;
}

export function Question({
  content,
  author,
  isAnswered = false,
  isHighlighted = false,
  children,
}: QuestionProps) {
  return(
    <div 
    className={classNames(
      'question',
      {answered: isAnswered}, // coloca a classe somente se for true 
      { highlighted: isHighlighted && !isAnswered}
      )}
    >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>
          {children}
        </div> 
      </footer>
    </div>
  );
}