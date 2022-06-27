class Produto {
   constructor({nome, imagem, descricao, preco}) {
      this.nome = nome
      this.imagem = imagem
      this.descricao = descricao
      this.preco = preco
   }

   selecionarProduto(elemento, nome, preco, tipo) {
      const selecionado = document.querySelector(`.${tipo} .selecionado`)
      if (selecionado !== null) {
         selecionado.classList.remove('selecionado')
      }
      elemento.classList.add('selecionado')

      if (tipo === 'prato') {
         pratoSelecionado = {
            nome,
            preco
         }
      }

      if (tipo === 'bebida') {
         bebidaSelecionada = {
            nome,
            preco
         }
      }

      if (tipo === 'sobremesa') {
         sobremesaSelecionada = {
            nome,
            preco
         }
      }

      verificarPedido()
   }
}

let pratoSelecionado = null
let bebidaSelecionada = null
let sobremesaSelecionada = null

const btnConfirmar = document.querySelector('.confirmar')
const btnCancelar = document.querySelector('.cancelar')
const btnPedir = document.querySelector('.fazer-pedido')

const pratos = [
   new Produto({
      nome: 'Estrombelete de Frango',
      imagem: 'img/frango_yin_yang.png',
      descricao: 'Um pouco de batata, um pouco de salada',
      preco: 14.9
   }),
   new Produto({
      nome: 'Asa de Boi',
      imagem: 'img/frango_yin_yang.png',
      descricao: 'Com molho shoyu',
      preco: 14.9
   }),
   new Produto({
      nome: 'Carne de Monstro',
      imagem: 'img/frango_yin_yang.png',
      descricao: 'Com batata assada e farofa',
      preco: 14.9
   })
]

const bebidas = [
   new Produto({
      nome: 'Coquinha gelada',
      imagem: 'img/coquinha_gelada.png',
      descricao: 'Lata 350ml',
      preco: 4.9
   }),
   new Produto({
      nome: 'Caldo de Cana',
      imagem: 'img/coquinha_gelada.png',
      descricao: 'Copo 600ml',
      preco: 4.9
   }),
   new Produto({
      nome: 'Corote Gelado',
      imagem: 'img/coquinha_gelada.png',
      descricao: 'Garrafa 400ml',
      preco: 4.9
   })
]

const sobremesas = [
   new Produto({
      nome: 'Pudim',
      imagem: 'img/pudim.png',
      descricao: 'Gosto de doce de leite',
      preco: 7.9
   }),
   new Produto({
      nome: 'Flam',
      imagem: 'img/pudim.png',
      descricao: 'Gosto de chocolate',
      preco: 7.9
   }),
   new Produto({
      nome: 'Brigadeiro',
      imagem: 'img/pudim.png',
      descricao: '3 unidades',
      preco: 7.9
   })
]

function getPrecoTotal() {
   return (
      pratoSelecionado.preco +
      bebidaSelecionada.preco +
      sobremesaSelecionada.preco
   )
}

function confirmarPedido() {
   const modal = document.querySelector('.overlay')
   modal.classList.remove('escondido')

   document.querySelector('.confirmar-pedido .prato .nome').innerHTML =
      pratoSelecionado.nome
   document.querySelector('.confirmar-pedido .prato .preco').innerHTML =
      pratoSelecionado.preco.toFixed(2)

   document.querySelector('.confirmar-pedido .bebida .nome').innerHTML =
      bebidaSelecionada.nome
   document.querySelector('.confirmar-pedido .bebida .preco').innerHTML =
      bebidaSelecionada.preco.toFixed(2)

   document.querySelector('.confirmar-pedido .sobremesa .nome').innerHTML =
      sobremesaSelecionada.nome
   document.querySelector('.confirmar-pedido .sobremesa .preco').innerHTML =
      sobremesaSelecionada.preco.toFixed(2)

   document.querySelector('.confirmar-pedido .total .preco').innerHTML =
      getPrecoTotal().toFixed(2)
}

function cancelarPedido() {
   const modal = document.querySelector('.overlay')
   modal.classList.add('escondido')
}

function enviarZap() {
   const telefoneRestaurante = 553299999999
   const encodedText = encodeURIComponent(
      `Olá, gostaria de fazer o pedido: \n- Prato: ${
         pratoSelecionado.nome
      } \n- Bebida: ${bebidaSelecionada.nome} \n- Sobremesa: ${
         sobremesaSelecionada.nome
      } \nTotal: R$ ${getPrecoTotal().toFixed(2)}`
   )

   const urlWhatsapp = `https://wa.me/${telefoneRestaurante}?text=${encodedText}`
   window.open(urlWhatsapp)
}

function verificarPedido() {
   if (pratoSelecionado && bebidaSelecionada && sobremesaSelecionada) {
      btnPedir.classList.add('ativo')
      btnPedir.disabled = false
      btnPedir.innerHTML = 'Fazer pedido'
   }
}

function getPratoView(prato) {
   const view = document.createElement('div')
   view.classList.add('opcao')
   view.addEventListener('click', () => {
      prato.selecionarProduto(view, prato.nome, prato.preco, 'prato')
   })
   view.innerHTML = `
        <img src="${prato.imagem}" />
        <div class="titulo">${prato.nome}</div>
        <div class="descricao">${prato.descricao}</div>
        <div class="fundo">
            <div class="preco">R$ ${prato.preco.toFixed(2)}</div>
            <div class="check">
                <ion-icon name="checkmark-circle"></ion-icon>
            </div>
        </div>
    `

   return view
}

function getBebidaView(bebida) {
   const view = document.createElement('div')
   view.classList.add('opcao')
   view.addEventListener('click', () => {
      bebida.selecionarProduto(view, bebida.nome, bebida.preco, 'bebida')
   })
   view.innerHTML = `
        <img src="${bebida.imagem}" />
        <div class="titulo">${bebida.nome}</div>
        <div class="descricao">${bebida.descricao}</div>
        <div class="fundo">
            <div class="preco">R$ ${bebida.preco.toFixed(2)}</div>
            <div class="check">
                <ion-icon name="checkmark-circle"></ion-icon>
            </div>
        </div>
    `

   return view
}

function getSobremesaView(sobremesa) {
   const view = document.createElement('div')
   view.classList.add('opcao')
   view.addEventListener('click', () => {
      sobremesa.selecionarProduto(view, sobremesa.nome, sobremesa.preco, 'sobremesa')
   })
   view.innerHTML = `
        <img src="${sobremesa.imagem}" />
        <div class="titulo">${sobremesa.nome}</div>
        <div class="descricao">${sobremesa.descricao}</div>
        <div class="fundo">
            <div class="preco">R$ ${sobremesa.preco.toFixed(2)}</div>
            <div class="check">
                <ion-icon name="checkmark-circle"></ion-icon>
            </div>
        </div>
    `

   return view
}

const pratosContainer = document.querySelector('.opcoes.prato')
pratos.forEach(prato => pratosContainer.appendChild(getPratoView(prato)))
const bebidasContainer = document.querySelector('.opcoes.bebida')
bebidas.forEach(bebida => bebidasContainer.appendChild(getBebidaView(bebida)))
const sobremesasContainer = document.querySelector('.opcoes.sobremesa')
sobremesas.forEach(sobremesa =>
   sobremesasContainer.appendChild(getSobremesaView(sobremesa))
)

btnConfirmar.addEventListener('click', () => {
   enviarZap()
})

btnCancelar.addEventListener('click', () => {
   cancelarPedido()
})

btnPedir.addEventListener('click', () => {
   confirmarPedido()
})
