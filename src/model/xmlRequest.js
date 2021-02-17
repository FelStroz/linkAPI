module.exports = {
    toXML: (id, name, items, value, title) => {
        return `
        <pedido>
            <numero>${id}</numero>
             <cliente>
                <nome>${name}</nome>
             </cliente>
             <itens>
                 <item>
                     <codigo>1</codigo>
                     <descricao>Produto 1</descricao>
                     <qtde>1</qtde>
                     <vlr_unit>0</vlr_unit>
                 </item>
             </itens>
             <obs>${title}</obs>
             <outrasDespesas>${value}</outrasDespesas>
        </pedido>`
    }
}
