/**
 * Input para moeda br
 * Fonte utilizada
 * https://github.com/danileao/youtube-input-mask
 */

import { Input, TextField } from "@mui/material";
import React, { InputHTMLAttributes, useCallback } from "react";
import { Form } from "react-bootstrap";
import { currency } from "../../../utils/currencyMask";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  mask: "cep" | "currency" | "cpf";
  prefix: string;
  preco: string;
  setPreco: React.Dispatch<React.SetStateAction<any>>
}

const InputCurrency= (props: InputProps) => {
  const handleKeyUp = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (props.mask === "currency") {
        currency(e);
        props.setPreco(e.currentTarget.value);
      }      
    },
    
    [props.mask]
    
  );

  return (
    <div className="input-group prefix">      
      {props.prefix && <span className="prefix-span">{props.prefix}</span>}
      <Form.Control type="text" placeholder="0,01" onKeyUp={handleKeyUp} dir={'rtl'} />
    </div>
  );
};

export default InputCurrency;