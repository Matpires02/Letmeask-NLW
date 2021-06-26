import { ReactNode } from 'react';

type ModalProps = {
  children: ReactNode;
  img: string;
  h2Text: string;
  spanText: string;
  svg?:ReactNode;
}

export function Modal(props: ModalProps) {

  return (
    <div className="modal">
      <div className="modal-content">
        {props.svg ? props.svg :<img src={props.img} alt="" />}
        <h2>{props.h2Text}</h2>
        <span>{props.spanText}</span>
        <div className="button-group">
          {props.children}
        </div>
      </div>
    </div>
  );
}