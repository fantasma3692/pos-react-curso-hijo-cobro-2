import styled from "styled-components";
import { useMonedasStore } from "../../../store/MonedasStore";
import { getAllInfoByISO } from "iso-country-currency";
import iso from "iso-country-currency";
import { InputText2 } from "../formularios/InputText2";
import { FlagIcon } from "react-flag-kit";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEmpresaStore } from "../../../store/EmpresaStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


export const MonedaConfig = () => {
  const { dataempresa, editarMonedaEmpresa } = useEmpresaStore();
  const { search, setSearch, selectedCountry, setSelectedCountry } =
    useMonedasStore();
    const queryClient = useQueryClient();
  const isocodigos = iso.getAllISOCodes();
  const handleSearchChange = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const handleSelectCountry = (country) => {
    const countryInfo = getAllInfoByISO(country.iso);
    setSelectedCountry({ ...country, currency: countryInfo.currency });
    setSearch(country.name);
  
    mutate.mutateAsync();
   
  };

  const filteredCountries = isocodigos.filter((country) =>
    country.countryName.toLowerCase().includes(search)
  );
   const editar = async () => {
    const p = {
      id:dataempresa?.id,
      simbolo_moneda: selectedCountry.symbol,
      iso: selectedCountry.iso,
      pais: selectedCountry.countryName,
      currency:selectedCountry.currency
    };
    await editarMonedaEmpresa(p);
  };
  const mutate = useMutation({
    mutationKey: "editar empresa moneda",
    mutationFn: editar,
    onSuccess: () => {
      queryClient.invalidateQueries('mostrar empresa');
      toast.success("🎉 datos guardados");
    },
  });
 
  return (
    <Container>
     
      <InputText2>
        <input
          className="form__field"
          type="search"
          placeholder="buscar país..."
          value={search}
          onChange={handleSearchChange}
          onFocus={() => setSearch(search)}
        />
      </InputText2>
      <Linea />

      {search && filteredCountries.length > 0 && (
        <Dropdown>
          <DropdownList>
            {filteredCountries.map((country, index) => (
              <DropdownItem
                key={index}
                onClick={() => handleSelectCountry(country)}
              >
                {country.countryName}
              </DropdownItem>
            ))}
          </DropdownList>
        </Dropdown>
      )}

      <Cardselect
        flag={
          selectedCountry
            ? `https://flagcdn.com/${selectedCountry.iso.toLowerCase()}.svg`
            : ""
        }
      >
        <article className="area1">
          <span className="titulo">Moneda actual</span>
        </article>
        <article className="area2">
          <article className="area2_1">
            <FlagIcon
              code={
                selectedCountry == null ? dataempresa?.iso : selectedCountry.iso
              }
              size={60}
            />
          </article>

          <article className="area2_2">
            <span>
              {selectedCountry == null
                ? dataempresa?.pais
                : selectedCountry.countryName}
            </span>
            <span className="simbolo">
              <Icon className="icono" icon="fluent-emoji:money-with-wings" />
              {selectedCountry == null
                ? dataempresa?.simbolo_moneda
                : selectedCountry.symbol}
            </span>
          </article>
        </article>
      </Cardselect>
      {
        mutate.onSuccess && <span>cambios guardados <Icon icon="emojione:pig" /></span>
      }
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

 
`;

const Dropdown = styled.div`
  top: -20px;
  position: relative;
`;

const DropdownList = styled.ul`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  position: absolute;
  margin-bottom: 15px;
  top: ${(props) => props.$top};
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  gap: 10px;
  z-index: 3;
  height: 230px;
  width: 95%;
  overflow: hidden;
  &:focus {
    outline: none;
  }
`;

const DropdownItem = styled.li`
  gap: 10px;
  display: flex;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.bgtotal};
  }
`;
const Cardselect = styled.section`
  border: 2px solid ${({ theme }) => theme.color2};
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  overflow: hidden;
  width: 320px;


  .area2 {
    display: flex;
    align-items: center;
    gap: 20px;
    .area2_2 {
      display: flex;
      flex-direction: column;
      gap: 10px;
      .simbolo {
        align-items: center;
        display: flex;
        gap: 5px;
        font-weight: 700;
        font-size: 20px;
        .icono {
          font-size: 30px;
        }
      }
    }
  }
`;
const Linea = styled.span`
  width: 100%;
  border-bottom: solid 2px ${({ theme }) => theme.color2};
  margin: 10px 0;
`;
