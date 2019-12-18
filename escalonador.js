const fs = require('fs');
var processos = [];
var processosTerminados = 0;
var entrada = fs.readFileSync('entrada.in');

function processaEntrada() {
    var stringEntrada = entrada.toString()
    var processosDaEntrada = stringEntrada.match(/[^ ].*\n(\n|)/g)
    for(var p of processosDaEntrada){
        var processo = {
            etapas: p.split(', '),
            naFila: true,
            tempoNaFila: 0
        }
        processos.push(processo)
    }
}

function escalonador() {
    var tempo = 0;
    var processoAtual = 0;
    var CPUrestanteProcessoAtual = Infinity;
    var proximoProcesso = 0;
    var CPUrestanteProximoProcesso = 0;
    var indiceProcesso = 0;
    var CPUrestante = 0;
    while(processos.length != processosTerminados){
        indiceProcesso = 0;
        contaIO=0;
        tempo++
        for(processo of processos) {
            if(processo.naFila) {
                var etapa = processo.etapas[0]
                if((/0 (cpu)|(io)/.test(etapa) && !/[1-9]/.test(etapa))) { // (?<!\d) (cpu)|(io)
                    processo.etapas.shift()
                    if(processo.etapas.length == 0){
                        processo.naFila = false
                        processosTerminados++;
                    }
                    CPUrestanteProximoProcesso = Infinity;
                    continue
                }
                else if(/io/.test(etapa)){ // E IO
                    IOrestante = etapa.match(/[0-9]+/)[0]
                    etapa = etapa.replace(/[0-9]+/, IOrestante - 1)
                    contaIO++;
                }
                else if(indiceProcesso == processoAtual) { // E CPU
                    CPUrestanteProximoProcesso = etapa.match(/[0-9]+/)[0]
                    CPUrestanteProximoProcesso--;
                    etapa = etapa.replace(/[0-9]+/, CPUrestanteProximoProcesso)
                }
                if(CPUrestante = parseInt(etapa.match(/[0-9]+ cpu/))){
                    if( (CPUrestante < CPUrestanteProcessoAtual)) {
                        proximoProcesso = indiceProcesso
                        CPUrestanteProximoProcesso = CPUrestante
                    }
                }               
                processo.etapas[0] = etapa;
                processo.tempoNaFila++;
            }
            indiceProcesso++;
        }
        processoAtual = proximoProcesso;
        CPUrestanteProcessoAtual = CPUrestanteProximoProcesso;
        if(contaIO == (processos.length - processosTerminados)) {
            tempo--;
        }
    }
    return tempo;
}

function imprimeTempos(){
    var numeroProcesso = 0;
    for(processo of processos) {
        numeroProcesso++;
        console.log("processo: "+numeroProcesso+" tempo: "+processo.tempoNaFila)
    }
}
processaEntrada()
var tempo = escalonador()
imprimeTempos()
console.log(tempo)
