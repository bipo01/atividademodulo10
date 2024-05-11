import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, Input, FormHelperText } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

const EditarTarefa = ({
  handleCloseEditar,
  idTarefaSelecionada,
  tarefas,
  tarefa,
  setTarefas,
}) => {
  const [idTarefa, setIdTarefa] = useState();
  const [tituloTarefa, setTituloTarefa] = useState("");
  const [descricaoTarefa, setDescricaoTarefa] = useState("");
  const [inicioTarefa, setInicioTarefa] = useState("");
  const [fimTarefa, setFimTarefa] = useState("");
  const [recursoTarefa, setRecursoTarefa] = useState("");
  const [statusTarefa, setStatusTarefa] = useState("");

  useEffect(() => {
    setIdTarefa(idTarefaSelecionada);
    setTituloTarefa(tarefa.tituloTarefa);
    setDescricaoTarefa(tarefa.descricaoTarefa);
    setInicioTarefa(tarefa.inicioTarefa);
    setFimTarefa(tarefa.fimTarefa);
    setRecursoTarefa(tarefa.recursoTarefa);
    setStatusTarefa(tarefa.statusTarefa);
  }, []);

  const handleRecurso = (event) => {
    setRecursoTarefa(event.target.value);
  };

  const handleStatus = (event) => {
    setStatusTarefa(event.target.value);
  };

  const handleEditar = () => {
    if (!tituloTarefa || !inicioTarefa || !fimTarefa) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (new Date(inicioTarefa) > new Date(fimTarefa)) {
      alert("A data de início não pode ser posterior à data de fim.");
      return;
    }

    setTarefas((current) =>
      current.map((obj) => {
        if (obj.idTarefa === idTarefaSelecionada) {
          return {
            ...obj,
            idTarefa: idTarefaSelecionada,
            tituloTarefa: tituloTarefa,
            descricaoTarefa: descricaoTarefa,
            inicioTarefa: inicioTarefa,
            fimTarefa: fimTarefa,
            recursoTarefa: recursoTarefa,
            statusTarefa: statusTarefa,
          };
        }
        return obj;
      })
    );

    handleCloseEditar();
  };

  return (
    <Grid container spacing={2}>
      <Card sx={style}>
        <CardHeader title="Tarefas" subheader="Edição de Tarefas" />
        <CardContent sx={{ width: "95%", maxWidth: "100%" }}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Input
                id="tarefa_titulo"
                aria-describedby="tarefa_titulo_helper_text"
                value={tituloTarefa}
                onChange={(e) => {
                  setTituloTarefa(e.target.value);
                }}
              />
              <FormHelperText id="tarefa_titulo_helper_text">
                Título da Tarefa.
              </FormHelperText>
            </FormControl>
          </Grid>
          {/* Outros campos do formulário aqui */}
          <Grid container spacing={2} pl={2} mt={2}>
            <Grid item xs={1}>
              <Button size="small" variant="contained" onClick={handleEditar}>
                Salvar
              </Button>
            </Grid>
            <Grid item xs={1}>
              <Button
                size="small"
                variant="outlined"
                onClick={handleCloseEditar}
              >
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  p: 4,
};

export default EditarTarefa;
