import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { InputText2 } from "../formularios/InputText2";
import { Btn1 } from "../../moleculas/Btn1";
import { useForm } from "react-hook-form";
import { useEmpresaStore } from "../../../store/EmpresaStore";
import { slideBackground } from "../../../styles/keyframes";
import { useMutation,useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
export const BasicosConfig = () => {
  const [file, setFile] = useState([]);
  const ref = useRef(null);
  const [fileurl, setFileurl] = useState("-");
  const { dataempresa, editarEmpresa } = useEmpresaStore();
  const queyClient = useQueryClient()
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  function abrirImagenes() {
    ref.current.click();
  }
  function prepararImagen(e) {
    let filelocal = e.target.files;
    let fileReaderlocal = new FileReader();
    fileReaderlocal.readAsDataURL(filelocal[0]);
    const tipoimg = e.target.files[0];
    setFile(tipoimg);
    if (fileReaderlocal && filelocal && filelocal.length) {
      fileReaderlocal.onload = function load() {
        setFileurl(fileReaderlocal.result);
      };
    }
  }
  const { mutate: doEditar, isPending } = useMutation({
    mutationKey: "editar empresa",
    mutationFn: editar,
    onError:(error)=>{
      toast.error("Ocurrio un error "+error.message)
    },
    onSuccess:()=>{
      toast.success("Datos guardados")
      queyClient.invalidateQueries("mostrar empresa")
    }
  });
  const llamadoafuncioneditar = (data) => {
    doEditar(data);
  };
  async function editar(data) {
    const p = {
      id: dataempresa?.id,
      nombre: data.nombre,
      direccion_fiscal: data.direccion,
      impuesto: data.impuesto,
      valor_impuesto: parseFloat(data.valor_impuesto),
    };
    await editarEmpresa(p, dataempresa?.logo, file);
  }

  return (
    <Container>
      {isPending ? (
        <span>guardando...🐖</span>
      ) : (
        <>
          <Title>Básico</Title>

          <Avatar>
            <span className="nombre">{dataempresa?.nombre}</span>
            {fileurl != "-" ? (
              <div className="ContentImage">
                <AvatarImage src={fileurl} alt="Avatar" />
              </div>
            ) : dataempresa?.logo != "-" ? (
              <div className="ContentImage">
                <AvatarImage src={dataempresa?.logo} alt="Avatar" />
              </div>
            ) : (
              <AvatarImage
                src="https://i.ibb.co/JjqNqnz/cerdosolo.png"
                alt="Avatar"
              />
            )}

            <EditButton onClick={abrirImagenes}>
              <Icon className=" icono" icon="lets-icons:edit-fill" />
            </EditButton>
            <input
              accept="image/jpeg, image/png"
              type="file"
              ref={ref}
              onChange={(e) => prepararImagen(e)}
            ></input>
          </Avatar>
          <form onSubmit={handleSubmit(llamadoafuncioneditar)}>
            <Label>Nombre</Label>
            <InputText2>
              <input
                className="form__field"
                placeholder="nombre"
                type="text"
                defaultValue={dataempresa?.nombre}
                {...register("nombre", {
                  required: true,
                })}
              />
              {errors.nombre?.type === "required" && <p>Campo requerido</p>}
            </InputText2>
            <Label>Dirección</Label>
            <InputText2>
              <input
                defaultValue={dataempresa?.direccion_fiscal}
                className="form__field"
                placeholder="direccion"
                type="text"
                {...register("direccion", {
                  required: true,
                })}
              />
              {errors.direccion?.type === "required" && <p>Campo requerido</p>}
            </InputText2>
            <Label>Impuesto</Label>
            <InputText2>
              <input
                defaultValue={dataempresa?.impuesto}
                className="form__field"
                placeholder="impuesto"
                type="text"
                {...register("impuesto", {
                  required: true,
                })}
              />
              {errors.impuesto?.type === "required" && <p>Campo requerido</p>}
            </InputText2>
            <Label>Valor impuesto</Label>
            <InputText2>
              <input
                step="0.01"
                defaultValue={dataempresa?.valor_impuesto}
                className="form__field"
                placeholder="valor impuesto"
                type="number"
                {...register("valor_impuesto", {
                  required: true,
                })}
              />
              {errors.valor_impuesto?.type === "required" && (
                <p>Campo requerido</p>
              )}
            </InputText2>
            <br></br>
            <Btn1 bgcolor="#0930bb" color="#fff" titulo="GUARDAR CAMBIOS" />
          </form>
          <br></br>
          <section className="advertencia">
            <Icon className="icono" icon="meteocons:barometer" />
            <span>
              los cambios de logo se ven reflejados en el lapso de 10 segundos.
            </span>
          </section>
        </>
      )}
    </Container>
  );
};
const Container = styled.div`
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;
  margin: 0 auto;
  p {
    color: #f75510;
    font-weight: 700;
  }
  .advertencia {
    background-color: rgba(237, 95, 6, 0.2);
    border-radius: 10px;
    padding: 10px;
    margin-top: 10px;
    margin: auto;
    height: 70px;
    display: flex;
    color: #f75510;
    width: 100%;
    align-items: center;
    .icono {
      font-size: 100px;
    }
  }
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Avatar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
  width: 100%;
  border-radius: 10px;
  padding: 10px;
  .nombre {
    font-weight: 700;
    position: absolute;
    text-align: center;
    align-self: center;
    margin: auto;
    top: 0;
    left: 100px;
    bottom: 0;
    right: 10px;
    font-size: 25px;
    overflow: hidden; /* Para asegurarse de que el contenido adicional esté oculto */
    white-space: normal; /* Permite el salto de línea */
    word-wrap: break-word; /* Rompe las palabras largas y las envuelve a la siguiente línea */
    color: #fff !important;
  }
  background-color: #391ebb;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 120 120'%3E%3Cpolygon fill='%23000' fill-opacity='0.19' points='120 0 120 60 90 30 60 0 0 0 0 0 60 60 0 120 60 120 90 90 120 60 120 0'/%3E%3C/svg%3E");

  background-size: 60px 60px;
  animation: ${slideBackground} 10s linear infinite;
  img {
    object-fit: cover;
  }
  input {
    display: none;
  }
`;

const AvatarImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 10px;
  margin-right: 10px;
`;

const EditButton = styled.button`
  background-color: #00aaff;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 60px;
  top: 10px;
  margin: auto;
  .icono {
    font-size: 20px;
  }
`;

const Label = styled.label`
  display: block;
  margin: 10px 0 5px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  border: none;
  border-radius: 5px;
  background-color: #00aaff;
  color: #fff;
  cursor: pointer;
`;
