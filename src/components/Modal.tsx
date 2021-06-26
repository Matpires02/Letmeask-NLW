import { ReactNode } from 'react';

type ModalProps = {
  children: ReactNode;
  img: string;
  h2Text: string;
  spanText: string;
}

export function Modal(props: ModalProps) {

  return (
    <div className="modal">
      <div className="modal-content">
        <img src={props.img} alt="" />
        <h2>{props.h2Text}</h2>
        <span>{props.spanText}</span>
        <div className="button-group">
          {props.children}
        </div>
      </div>
    </div>
  );
}