
import { useState } from 'react';
import Select from 'react-select';
import { categoriasOptions } from '../../../constants/categorias';
import { CategoriaModel } from '../../../models/Categoria';

interface SelectCategoriaProps {
  selectedCategorias: CategoriaModel[],
  setSelectedCategorias: React.Dispatch<React.SetStateAction<any>>
}

const SelectCategoria = (props: SelectCategoriaProps) => {
  const onChange = (option: readonly CategoriaModel[]) => {
    var _option = option as CategoriaModel[];
    props.setSelectedCategorias(_option);
  }
  return (
    <Select
      isMulti
      name="colors"
      options={categoriasOptions}
      className="basic-multi-select"
      classNamePrefix="select"
      onChange={o => onChange(o)}
      isOptionDisabled={(_) => props.selectedCategorias.length >= 3}      
    />
  );
}

export default SelectCategoria;