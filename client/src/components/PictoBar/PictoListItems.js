import * as React from 'react';
import { useHistory } from "react-router-dom";
import { ImageList, ImageListItem } from '@mui/material';

export const PictoListItems = ({onSelectPictograma}) => {

  const history = useHistory();
   
  const onSelectPictogramaLocal = (e) => {
    const selectedImg = e.target.src;
    if(onSelectPictograma){
      onSelectPictograma(selectedImg,'');
    }
  }
  return (
    <div>
      <ImageList sx={{ width: 340, height: 340, 'padding-left': '5px' }} cols={3} rowHeight={100}>
  {itemData.map((item) => (
    <ImageListItem key={item.img} onClick={onSelectPictogramaLocal}>
      <img
        src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
        srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
        alt={item.title}
        loading="lazy"
        style={{"border": '2px solid #555', "cursor": "pointer"}}
      />
    </ImageListItem>
  ))}
</ImageList>
    </div>
  )
};

const itemData = [
  {
    img: '/assets/images/bicicleta.png',
    title: 'Bicicleta',
  },
  {
    img: '/assets/images/el.png',
    title: 'El',
  },
  {
    img: '/assets/images/niño.png',
    title: 'Niño',
  },
  {
    img: '/assets/images/hablar.png',
    title: 'Hablar',
  },
  {
    img: '/assets/images/_con.png',
    title: 'Con',
  },
  {
    img: '/assets/images/la.png',
    title: 'La',
  },
  {
    img: '/assets/images/abuela.png',
    title: 'Abuela',
  },
  {
    img: '/assets/images/preparar.png',
    title: 'Preparar',
  },
  {
    img: '/assets/images/comida.png',
    title: 'Comida',
  },
  {
    img: '/assets/images/leerpictogramas.png',
    title: 'Leer',
  },
  {
    img: '/assets/images/completar.png',
    title: 'Completar',
  },
  {
    img: '/assets/images/unir.png',
    title: 'Unir',
  }
];
