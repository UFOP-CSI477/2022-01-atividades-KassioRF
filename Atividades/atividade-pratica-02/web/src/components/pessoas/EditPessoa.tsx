import { useState, useEffect } from 'react';
import { PessoaModel } from '../../hooks/PessoaModel';
import api from '../../services/api';
import _Spinner from '../utils/spinner';
import { useNavigate } from "react-router-dom";

const EditPessoa = (pessoa: PessoaModel) => {
  return (
    <>
      <h4> Edit pessoa </h4>

    </>
  );
}

export default EditPessoa;