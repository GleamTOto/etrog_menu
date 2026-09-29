import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Intro } from './components/Intro'
import { LanguageSwitcher } from './components/LanguageSwitcher'

/* ─── Data Types ─── */

interface Dish {
  nameKey: string
  price?: string
  descriptionKey: string
  noteKey?: string
}

interface SubSection {
  subtitleKey: string
  dishes: Dish[]
}

interface MenuSection {
  number: string
  titleKey: string
  type: 'default' | 'guarniciones' | 'buffet'
  subsections?: SubSection[]
  dishes?: Dish[]
}

/* ─── Menu Data (translation keys) ─── */

const menuSections: MenuSection[] = [
  {
    number: '01',
    titleKey: 'desayunos.title',
    type: 'default',
    subsections: [
      {
        subtitleKey: 'desayunos.guatemalteco.subtitle',
        dishes: [
          {
            nameKey: 'desayunos.guatemalteco.amanecer_etrog.name',
            price: 'Q70',
            descriptionKey: 'desayunos.guatemalteco.amanecer_etrog.description',
            noteKey: 'desayunos.guatemalteco.amanecer_etrog.note',
          },
          {
            nameKey: 'desayunos.guatemalteco.desayuno_guatemalteco.name',
            price: 'Q60',
            descriptionKey: 'desayunos.guatemalteco.desayuno_guatemalteco.description',
            noteKey: 'desayunos.guatemalteco.desayuno_guatemalteco.note',
          },
          {
            nameKey: 'desayunos.guatemalteco.chilaquiles.name',
            price: 'Q65',
            descriptionKey: 'desayunos.guatemalteco.chilaquiles.description',
            noteKey: 'desayunos.guatemalteco.chilaquiles.note',
          },
        ],
      },
      {
        subtitleKey: 'desayunos.motuleno.subtitle',
        dishes: [
          {
            nameKey: 'desayunos.motuleno.huevos_motulenos.name',
            price: 'Q55',
            descriptionKey: 'desayunos.motuleno.huevos_motulenos.description',
            noteKey: 'desayunos.motuleno.huevos_motulenos.note',
          },
          {
            nameKey: 'desayunos.motuleno.desayuno_americano.name',
            price: 'Q50',
            descriptionKey: 'desayunos.motuleno.desayuno_americano.description',
            noteKey: 'desayunos.motuleno.desayuno_americano.note',
          },
        ],
      },
      {
        subtitleKey: 'desayunos.dulces.subtitle',
        dishes: [
          {
            nameKey: 'desayunos.dulces.panqueques_campestres.name',
            price: 'Q40',
            descriptionKey: 'desayunos.dulces.panqueques_campestres.description',
            noteKey: 'desayunos.dulces.panqueques_campestres.note',
          },
          {
            nameKey: 'desayunos.dulces.omelet.name',
            price: 'Q65',
            descriptionKey: 'desayunos.dulces.omelet.description',
            noteKey: 'desayunos.dulces.omelet.note',
          },
        ],
      },
    ],
  },
  {
    number: '02',
    titleKey: 'tradicionales.title',
    type: 'default',
    dishes: [
      {
        nameKey: 'tradicionales.caldo_de_gallina.name',
        price: 'Q70',
        descriptionKey: 'tradicionales.caldo_de_gallina.description',
      },
      {
        nameKey: 'tradicionales.caldo_de_chojin.name',
        price: 'Q70',
        descriptionKey: 'tradicionales.caldo_de_chojin.description',
      },
    ],
  },
  {
    number: '03',
    titleKey: 'entradas.title',
    type: 'default',
    dishes: [
      {
        nameKey: 'entradas.carpaccio_de_lomito.name',
        price: 'Q75',
        descriptionKey: 'entradas.carpaccio_de_lomito.description',
      },
      {
        nameKey: 'entradas.nachos_con_carne_y_queso.name',
        price: 'Q55',
        descriptionKey: 'entradas.nachos_con_carne_y_queso.description',
      },
      {
        nameKey: 'entradas.alitas.name',
        price: 'Q55',
        descriptionKey: 'entradas.alitas.description',
      },
      {
        nameKey: 'entradas.mejillones_al_perol.name',
        price: 'Q100',
        descriptionKey: 'entradas.mejillones_al_perol.description',
      },
    ],
    subsections: [
      {
        subtitleKey: 'entradas.ensaladas.subtitle',
        dishes: [
          {
            nameKey: 'entradas.ensaladas.ensalada_cesar.name',
            price: 'Q65',
            descriptionKey: 'entradas.ensaladas.ensalada_cesar.description',
          },
          {
            nameKey: 'entradas.ensaladas.ensalada_mixta_con_pollo.name',
            price: 'Q65',
            descriptionKey: 'entradas.ensaladas.ensalada_mixta_con_pollo.description',
          },
          {
            nameKey: 'entradas.ensaladas.ensalada_campestre_de_pollo.name',
            price: 'Q65',
            descriptionKey: 'entradas.ensaladas.ensalada_campestre_de_pollo.description',
          },
        ],
      },
    ],
  },
  {
    number: '04',
    titleKey: 'frutos_del_mar.title',
    type: 'default',
    subsections: [
      {
        subtitleKey: 'frutos_del_mar.parrilla.subtitle',
        dishes: [
          {
            nameKey: 'frutos_del_mar.parrilla.parrillada_mazatleca.name',
            price: 'Q170',
            descriptionKey: 'frutos_del_mar.parrilla.parrillada_mazatleca.description',
          },
        ],
      },
      {
        subtitleKey: 'frutos_del_mar.caldos.subtitle',
        dishes: [
          {
            nameKey: 'frutos_del_mar.caldos.caldo_de_mariscos.name',
            price: 'Q200',
            descriptionKey: 'frutos_del_mar.caldos.caldo_de_mariscos.description',
          },
        ],
      },
      {
        subtitleKey: 'frutos_del_mar.pescados.subtitle',
        dishes: [
          {
            nameKey: 'frutos_del_mar.pescados.filete_de_tilapia.name',
            price: 'Q75',
            descriptionKey: 'frutos_del_mar.pescados.filete_de_tilapia.description',
          },
          {
            nameKey: 'frutos_del_mar.pescados.tilapia_entera.name',
            price: 'Q99',
            descriptionKey: 'frutos_del_mar.pescados.tilapia_entera.description',
          },
          {
            nameKey: 'frutos_del_mar.pescados.mojarra_zarandeada.name',
            price: 'Q110',
            descriptionKey: 'frutos_del_mar.pescados.mojarra_zarandeada.description',
          },
        ],
      },
      {
        subtitleKey: 'frutos_del_mar.camarones.subtitle',
        dishes: [
          {
            nameKey: 'frutos_del_mar.camarones.camarones_etrog.name',
            price: 'Q165',
            descriptionKey: 'frutos_del_mar.camarones.camarones_etrog.description',
          },
          {
            nameKey: 'frutos_del_mar.camarones.camaron_jumbo.name',
            price: 'Q125',
            descriptionKey: 'frutos_del_mar.camarones.camaron_jumbo.description',
          },
          {
            nameKey: 'frutos_del_mar.camarones.camarones_louisiana.name',
            price: 'Q125',
            descriptionKey: 'frutos_del_mar.camarones.camarones_louisiana.description',
          },
          {
            nameKey: 'frutos_del_mar.camarones.camarones_tropicales_al_coco.name',
            price: 'Q135',
            descriptionKey: 'frutos_del_mar.camarones.camarones_tropicales_al_coco.description',
          },
        ],
      },
      {
        subtitleKey: 'frutos_del_mar.mariscos.subtitle',
        dishes: [
          {
            nameKey: 'frutos_del_mar.mariscos.pulpo_al_ajillo.name',
            price: 'Q99',
            descriptionKey: 'frutos_del_mar.mariscos.pulpo_al_ajillo.description',
          },
        ],
      },
      {
        subtitleKey: 'frutos_del_mar.crudos.subtitle',
        dishes: [
          {
            nameKey: 'frutos_del_mar.crudos.ceviche.name',
            price: 'Q125',
            descriptionKey: 'frutos_del_mar.crudos.ceviche.description',
          },
        ],
      },
    ],
  },
  {
    number: '05',
    titleKey: 'cortes_y_parrilla.title',
    type: 'default',
    subsections: [
      {
        subtitleKey: 'cortes_y_parrilla.cortes.subtitle',
        dishes: [
          {
            nameKey: 'cortes_y_parrilla.cortes.puyazo_importado.name',
            price: 'Q140',
            descriptionKey: 'cortes_y_parrilla.cortes.puyazo_importado.description',
          },
          {
            nameKey: 'cortes_y_parrilla.cortes.lomito_importado.name',
            price: 'Q140',
            descriptionKey: 'cortes_y_parrilla.cortes.lomito_importado.description',
          },
          {
            nameKey: 'cortes_y_parrilla.cortes.churrasco_de_viuda_importada.name',
            price: 'Q110',
            descriptionKey: 'cortes_y_parrilla.cortes.churrasco_de_viuda_importada.description',
          },
          {
            nameKey: 'cortes_y_parrilla.cortes.pollo_a_la_parrilla.name',
            price: 'Q75',
            descriptionKey: 'cortes_y_parrilla.cortes.pollo_a_la_parrilla.description',
          },
        ],
      },
      {
        subtitleKey: 'cortes_y_parrilla.parrilladas.subtitle',
        dishes: [
          {
            nameKey: 'cortes_y_parrilla.parrilladas.parrillada_para_2.name',
            price: 'Q300',
            descriptionKey: 'cortes_y_parrilla.parrilladas.parrillada_para_2.description',
          },
          {
            nameKey: 'cortes_y_parrilla.parrilladas.parrillada_para_4.name',
            price: 'Q550',
            descriptionKey: 'cortes_y_parrilla.parrilladas.parrillada_para_4.description',
          },
        ],
      },
      {
        subtitleKey: 'cortes_y_parrilla.mar_y_tierra.subtitle',
        dishes: [
          {
            nameKey: 'cortes_y_parrilla.mar_y_tierra.mar_y_tierra.name',
            price: 'Q225',
            descriptionKey: 'cortes_y_parrilla.mar_y_tierra.mar_y_tierra.description',
          },
        ],
      },
    ],
  },
  {
    number: '06',
    titleKey: 'sandwicheria.title',
    type: 'default',
    subsections: [
      {
        subtitleKey: 'sandwicheria.hamburguesas.subtitle',
        dishes: [
          {
            nameKey: 'sandwicheria.hamburguesas.quesoburguera_clasica_etrog.name',
            price: 'Q60',
            descriptionKey: 'sandwicheria.hamburguesas.quesoburguera_clasica_etrog.description',
            noteKey: 'sandwicheria.hamburguesas.quesoburguera_clasica_etrog.note',
          },
          {
            nameKey: 'sandwicheria.hamburguesas.hamburguesa_premium_etrog.name',
            price: 'Q80',
            descriptionKey: 'sandwicheria.hamburguesas.hamburguesa_premium_etrog.description',
          },
        ],
      },
      {
        subtitleKey: 'sandwicheria.burritos.subtitle',
        dishes: [
          {
            nameKey: 'sandwicheria.burritos.burrito_etrog_de_pollo_asado.name',
            price: 'Q60',
            descriptionKey: 'sandwicheria.burritos.burrito_etrog_de_pollo_asado.description',
          },
          {
            nameKey: 'sandwicheria.burritos.burrito_etrog_de_lomito.name',
            price: 'Q75',
            descriptionKey: 'sandwicheria.burritos.burrito_etrog_de_lomito.description',
          },
        ],
      },
      {
        subtitleKey: 'sandwicheria.baguettes.subtitle',
        dishes: [
          {
            nameKey: 'sandwicheria.baguettes.baguette_de_oregano_con_pollo.name',
            price: 'Q60',
            descriptionKey: 'sandwicheria.baguettes.baguette_de_oregano_con_pollo.description',
          },
          {
            nameKey: 'sandwicheria.baguettes.baguette_de_lomito.name',
            price: 'Q75',
            descriptionKey: 'sandwicheria.baguettes.baguette_de_lomito.description',
          },
        ],
      },
    ],
  },
  {
    number: '07',
    titleKey: 'pasta.title',
    type: 'default',
    dishes: [
      {
        nameKey: 'pasta.fettuccini_alfredo_con_camaron.name',
        price: 'Q135',
        descriptionKey: 'pasta.fettuccini_alfredo_con_camaron.description',
      },
      {
        nameKey: 'pasta.fettuccini_alfredo_con_pollo.name',
        price: 'Q135',
        descriptionKey: 'pasta.fettuccini_alfredo_con_pollo.description',
      },
      {
        nameKey: 'pasta.fettuccini_alfredo_con_lomito.name',
        price: 'Q135',
        descriptionKey: 'pasta.fettuccini_alfredo_con_lomito.description',
      },
    ],
  },
  {
    number: '08',
    titleKey: 'infantil.title',
    type: 'default',
    dishes: [
      {
        nameKey: 'infantil.deditos_crujientes_de_pollo.name',
        price: 'Q40',
        descriptionKey: 'infantil.deditos_crujientes_de_pollo.description',
      },
    ],
  },
  {
    number: '09',
    titleKey: 'postres.title',
    type: 'default',
    dishes: [
      {
        nameKey: 'postres.pie_de_queso.name',
        price: 'Q35',
        descriptionKey: 'postres.pie_de_queso.description',
      },
      {
        nameKey: 'postres.pie_de_chocobanano.name',
        price: 'Q35',
        descriptionKey: 'postres.pie_de_chocobanano.description',
      },
      {
        nameKey: 'postres.crepa_con_helado.name',
        price: 'Q35',
        descriptionKey: 'postres.crepa_con_helado.description',
      },
      {
        nameKey: 'postres.molletes_dulces.name',
        price: 'Q30',
        descriptionKey: 'postres.molletes_dulces.description',
      },
      {
        nameKey: 'postres.mole_de_platano.name',
        price: 'Q30',
        descriptionKey: 'postres.mole_de_platano.description',
      },
    ],
  },
  {
    number: '10',
    titleKey: 'guarniciones.title',
    type: 'guarniciones',
    dishes: [
      { nameKey: 'guarniciones.queso_fresco.name', price: 'Q12', descriptionKey: 'guarniciones.queso_fresco.description' },
      { nameKey: 'guarniciones.crema.name', price: 'Q12', descriptionKey: 'guarniciones.crema.description' },
      { nameKey: 'guarniciones.longaniza.name', price: 'Q16', descriptionKey: 'guarniciones.longaniza.description' },
      { nameKey: 'guarniciones.frijoles_volteados.name', price: 'Q10', descriptionKey: 'guarniciones.frijoles_volteados.description' },
      { nameKey: 'guarniciones.guacamol.name', price: 'Q20', descriptionKey: 'guarniciones.guacamol.description' },
      { nameKey: 'guarniciones.papas_etrog.name', price: 'Q25', descriptionKey: 'guarniciones.papas_etrog.description' },
      { nameKey: 'guarniciones.papas_fritas.name', price: 'Q25', descriptionKey: 'guarniciones.papas_fritas.description' },
      { nameKey: 'guarniciones.huevos.name', price: 'Q15', descriptionKey: 'guarniciones.huevos.description' },
      { nameKey: 'guarniciones.porcion_de_pan.name', price: 'Q10', descriptionKey: 'guarniciones.porcion_de_pan.description' },
      { nameKey: 'guarniciones.porcion_de_tamalitos.name', price: 'Q10', descriptionKey: 'guarniciones.porcion_de_tamalitos.description' },
      { nameKey: 'guarniciones.porcion_de_arroz.name', price: 'Q10', descriptionKey: 'guarniciones.porcion_de_arroz.description' },
      { nameKey: 'guarniciones.porcion_de_tortillas.name', price: 'Q7', descriptionKey: 'guarniciones.porcion_de_tortillas.description' },
    ],
  },
  {
    number: '11',
    titleKey: 'bebidas.title',
    type: 'default',
    subsections: [
      {
        subtitleKey: 'bebidas.calientes.subtitle',
        dishes: [
          { nameKey: 'bebidas.calientes.cafe_americano.name', price: 'Q20', descriptionKey: 'bebidas.calientes.cafe_americano.description' },
          { nameKey: 'bebidas.calientes.cafe_con_leche.name', price: 'Q25', descriptionKey: 'bebidas.calientes.cafe_con_leche.description' },
          { nameKey: 'bebidas.calientes.capuchino.name', price: 'Q25', descriptionKey: 'bebidas.calientes.capuchino.description' },
          { nameKey: 'bebidas.calientes.latte.name', price: 'Q25', descriptionKey: 'bebidas.calientes.latte.description' },
          { nameKey: 'bebidas.calientes.mocca.name', price: 'Q30', descriptionKey: 'bebidas.calientes.mocca.description' },
          { nameKey: 'bebidas.calientes.chocolate_con_agua.name', price: 'Q25', descriptionKey: 'bebidas.calientes.chocolate_con_agua.description' },
          { nameKey: 'bebidas.calientes.chocolate_con_leche.name', price: 'Q30', descriptionKey: 'bebidas.calientes.chocolate_con_leche.description' },
          { nameKey: 'bebidas.calientes.te_e_infusiones.name', price: 'Q15', descriptionKey: 'bebidas.calientes.te_e_infusiones.description' },
        ],
      },
      {
        subtitleKey: 'bebidas.moctels.subtitle',
        dishes: [
          { nameKey: 'bebidas.moctels.ginger_fresh.name', price: 'Q35', descriptionKey: 'bebidas.moctels.ginger_fresh.description' },
          { nameKey: 'bebidas.moctels.atardecer.name', price: 'Q35', descriptionKey: 'bebidas.moctels.atardecer.description' },
          { nameKey: 'bebidas.moctels.pina_colada_virgen.name', price: 'Q40', descriptionKey: 'bebidas.moctels.pina_colada_virgen.description' },
          { nameKey: 'bebidas.moctels.mojito_de_fresa.name', price: 'Q40', descriptionKey: 'bebidas.moctels.mojito_de_fresa.description' },
          { nameKey: 'bebidas.moctels.sangria_tinta.name', price: 'Q40', descriptionKey: 'bebidas.moctels.sangria_tinta.description' },
        ],
      },
      {
        subtitleKey: 'bebidas.vinos_y_espumosos.subtitle',
        dishes: [
          { nameKey: 'bebidas.vinos_y_espumosos.casillero_cabernet.name', price: 'Q240', descriptionKey: 'bebidas.vinos_y_espumosos.casillero_cabernet.description' },
          { nameKey: 'bebidas.vinos_y_espumosos.casillero_merlot.name', price: 'Q240', descriptionKey: 'bebidas.vinos_y_espumosos.casillero_merlot.description' },
          { nameKey: 'bebidas.vinos_y_espumosos.casillero_rose.name', price: 'Q240', descriptionKey: 'bebidas.vinos_y_espumosos.casillero_rose.description' },
          { nameKey: 'bebidas.vinos_y_espumosos.casillero_sauvignon.name', price: 'Q240', descriptionKey: 'bebidas.vinos_y_espumosos.casillero_sauvignon.description' },
          { nameKey: 'bebidas.vinos_y_espumosos.moscato_fili.name', price: 'Q190', descriptionKey: 'bebidas.vinos_y_espumosos.moscato_fili.description' },
          { nameKey: 'bebidas.vinos_y_espumosos.fragolino_bianco.name', price: 'Q190', descriptionKey: 'bebidas.vinos_y_espumosos.fragolino_bianco.description' },
          { nameKey: 'bebidas.vinos_y_espumosos.fragolino_rosso.name', price: 'Q190', descriptionKey: 'bebidas.vinos_y_espumosos.fragolino_rosso.description' },
          { nameKey: 'bebidas.vinos_y_espumosos.frontera_merlot.name', price: 'Q175', descriptionKey: 'bebidas.vinos_y_espumosos.frontera_merlot.description' },
          { nameKey: 'bebidas.vinos_y_espumosos.frontera_carmenere.name', price: 'Q175', descriptionKey: 'bebidas.vinos_y_espumosos.frontera_carmenere.description' },
          { nameKey: 'bebidas.vinos_y_espumosos.frontera_spritzer_rose.name', price: 'Q175', descriptionKey: 'bebidas.vinos_y_espumosos.frontera_spritzer_rose.description' },
          { nameKey: 'bebidas.vinos_y_espumosos.frontera_spritzer_elderflower.name', price: 'Q175', descriptionKey: 'bebidas.vinos_y_espumosos.frontera_spritzer_elderflower.description' },
        ],
      },
      {
        subtitleKey: 'bebidas.naturales.subtitle',
        dishes: [
          { nameKey: 'bebidas.naturales.jamaica.name', price: 'Q30', descriptionKey: 'bebidas.naturales.jamaica.description', noteKey: 'bebidas.naturales.jamaica.note' },
          { nameKey: 'bebidas.naturales.guanabana.name', price: 'Q30', descriptionKey: 'bebidas.naturales.guanabana.description', noteKey: 'bebidas.naturales.guanabana.note' },
          { nameKey: 'bebidas.naturales.horchata.name', price: 'Q30', descriptionKey: 'bebidas.naturales.horchata.description', noteKey: 'bebidas.naturales.horchata.note' },
          { nameKey: 'bebidas.naturales.naranjada_con_agua.name', price: 'Q30', descriptionKey: 'bebidas.naturales.naranjada_con_agua.description', noteKey: 'bebidas.naturales.naranjada_con_agua.note' },
          { nameKey: 'bebidas.naturales.naranjada_con_soda.name', price: 'Q35', descriptionKey: 'bebidas.naturales.naranjada_con_soda.description', noteKey: 'bebidas.naturales.naranjada_con_soda.note' },
          { nameKey: 'bebidas.naturales.naranjada_con_pepitoria.name', price: 'Q35', descriptionKey: 'bebidas.naturales.naranjada_con_pepitoria.description' },
          { nameKey: 'bebidas.naturales.limonada_con_agua.name', price: 'Q30', descriptionKey: 'bebidas.naturales.limonada_con_agua.description', noteKey: 'bebidas.naturales.limonada_con_agua.note' },
          { nameKey: 'bebidas.naturales.limonada_con_soda.name', price: 'Q35', descriptionKey: 'bebidas.naturales.limonada_con_soda.description', noteKey: 'bebidas.naturales.limonada_con_soda.note' },
          { nameKey: 'bebidas.naturales.jugo_de_naranja.name', price: 'Q40', descriptionKey: 'bebidas.naturales.jugo_de_naranja.description' },
        ],
      },
      {
        subtitleKey: 'bebidas.frias.subtitle',
        dishes: [
          { nameKey: 'bebidas.frias.coca_cola.name', price: 'Q15', descriptionKey: 'bebidas.frias.coca_cola.description' },
          { nameKey: 'bebidas.frias.coca_cola_sabores.name', price: 'Q15', descriptionKey: 'bebidas.frias.coca_cola_sabores.description' },
          { nameKey: 'bebidas.frias.pepsi.name', price: 'Q15', descriptionKey: 'bebidas.frias.pepsi.description' },
          { nameKey: 'bebidas.frias.pepsi_sabores.name', price: 'Q15', descriptionKey: 'bebidas.frias.pepsi_sabores.description' },
          { nameKey: 'bebidas.frias.agua_pura.name', price: 'Q12', descriptionKey: 'bebidas.frias.agua_pura.description' },
          { nameKey: 'bebidas.frias.cimarrona.name', price: 'Q20', descriptionKey: 'bebidas.frias.cimarrona.description' },
          { nameKey: 'bebidas.frias.v8_preparado.name', price: 'Q25', descriptionKey: 'bebidas.frias.v8_preparado.description' },
          { nameKey: 'bebidas.frias.fruit_punch.name', price: 'Q30', descriptionKey: 'bebidas.frias.fruit_punch.description' },
        ],
      },
      {
        subtitleKey: 'bebidas.frappe.subtitle',
        dishes: [
          { nameKey: 'bebidas.frappe.frappuchino.name', price: 'Q35', descriptionKey: 'bebidas.frappe.frappuchino.description' },
          { nameKey: 'bebidas.frappe.frappe_oreo.name', price: 'Q35', descriptionKey: 'bebidas.frappe.frappe_oreo.description' },
          { nameKey: 'bebidas.frappe.frappe_de_caramelo_con_mani.name', price: 'Q35', descriptionKey: 'bebidas.frappe.frappe_de_caramelo_con_mani.description' },
        ],
      },
      {
        subtitleKey: 'bebidas.licuados.subtitle',
        dishes: [
          { nameKey: 'bebidas.licuados.licuado_de_fruta.name', price: 'Q20', descriptionKey: 'bebidas.licuados.licuado_de_fruta.description', noteKey: 'bebidas.licuados.licuado_de_fruta.note' },
          { nameKey: 'bebidas.licuados.licuado_fresa_banano.name', price: 'Q25', descriptionKey: 'bebidas.licuados.licuado_fresa_banano.description', noteKey: 'bebidas.licuados.licuado_fresa_banano.note' },
          { nameKey: 'bebidas.licuados.tres_amores.name', price: 'Q30', descriptionKey: 'bebidas.licuados.tres_amores.description', noteKey: 'bebidas.licuados.tres_amores.note' },
          { nameKey: 'bebidas.licuados.chocomilk.name', price: 'Q25', descriptionKey: 'bebidas.licuados.chocomilk.description', noteKey: 'bebidas.licuados.chocomilk.note' },
        ],
      },
    ],
  },
  {
    number: '12',
    titleKey: 'buffet.title',
    type: 'buffet',
    dishes: [
      {
        nameKey: 'buffet.buffet_dominical.name',
        descriptionKey: 'buffet.buffet_dominical.description',
      },
    ],
  },
]

/* ─── Services Data (translation keys) ─── */

interface ServiceData {
  titleKey: string
  descriptionKey: string
  timeKey: string
}

const servicesData: ServiceData[] = [
  { titleKey: 'buffet_dominical.title', descriptionKey: 'buffet_dominical.description', timeKey: 'buffet_dominical.time' },
  { titleKey: 'desayunos.title', descriptionKey: 'desayunos.description', timeKey: 'desayunos.time' },
  { titleKey: 'almuerzo.title', descriptionKey: 'almuerzo.description', timeKey: 'almuerzo.time' },
]

interface SpecialServiceData {
  titleKey: string
  descriptionKey: string
}

const specialServicesData: SpecialServiceData[] = [
  { titleKey: 'special.eventos.title', descriptionKey: 'special.eventos.description' },
  { titleKey: 'special.mesas_romanticas.title', descriptionKey: 'special.mesas_romanticas.description' },
  { titleKey: 'special.delivery.title', descriptionKey: 'special.delivery.description' },
]

/* ─── Intersection Observer Hook ─── */

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    const targets = el.querySelectorAll('.animate-on-scroll')
    targets.forEach((target) => observer.observe(target))

    return () => observer.disconnect()
  }, [])

  return ref
}

/* ─── Components ─── */

function GoldDivider({ strong = false }: { strong?: boolean }) {
  return (
    <div
      className={strong ? 'gold-divider-strong' : 'gold-divider'}
      role="separator"
      aria-hidden="true"
    />
  )
}

function SectionHeader({ number, title }: { number: string; title: string }) {
  return (
    <div className="animate-on-scroll mb-10 text-center">
      <span
        className="font-mono text-xs tracking-[0.3em] uppercase"
        style={{ color: 'var(--gold-muted)' }}
      >
        {number}
      </span>
      <h2
        className="font-display mt-3 text-lg font-400 tracking-[0.2em] uppercase"
        style={{ color: 'var(--cream)' }}
      >
        {title}
      </h2>
    </div>
  )
}

function SubSectionHeader({ subtitle }: { subtitle: string }) {
  return (
    <h3
      className="animate-on-scroll mt-8 mb-4 font-display text-sm font-400 tracking-[0.15em] uppercase"
      style={{ color: 'var(--gold)' }}
    >
      {subtitle}
    </h3>
  )
}

function DishRow({ name, price, description, note, compact = false }: {
  name: string
  price?: string
  description: string
  note?: string
  compact?: boolean
}) {
  return (
    <article className={`animate-on-scroll ${compact ? 'py-3' : 'py-5'}`}>
      <div className="flex items-baseline justify-between gap-4">
        <h3
          className={`font-display leading-snug ${compact ? 'text-sm' : 'text-base'} font-400`}
          style={{ color: 'var(--body)' }}
        >
          {name}
        </h3>
        {price && (
          <span
            className="font-mono tabular-nums shrink-0 text-sm"
            style={{ color: 'var(--gold)' }}
          >
            {price}
          </span>
        )}
      </div>
      {description && (
        <p
          className={`mt-1.5 leading-relaxed ${compact ? 'text-xs' : 'text-sm'}`}
          style={{ color: 'var(--body-75)' }}
        >
          {description}
        </p>
      )}
      {note && (
        <p
          className="mt-1 text-xs italic"
          style={{ color: 'var(--gold-muted)' }}
        >
          {note}
        </p>
      )}
    </article>
  )
}

function GuarnicionRow({ name, price }: { name: string; price?: string }) {
  return (
    <div className="animate-on-scroll flex items-baseline justify-between gap-3 py-2">
      <span
        className="font-display text-sm font-400"
        style={{ color: 'var(--body)' }}
      >
        {name}
      </span>
      {price && (
        <span
          className="font-mono tabular-nums shrink-0 text-xs"
          style={{ color: 'var(--gold)' }}
        >
          {price}
        </span>
      )}
    </div>
  )
}

function BuffetBanner({ name, description }: { name: string; description: string }) {
  const { t } = useTranslation('ui')

  return (
    <div className="animate-on-scroll mx-auto max-w-xl rounded-sm border border-[var(--gold-dim)] bg-[var(--bg-elevated)] p-6 text-center">
      <p
        className="font-display text-base font-400 tracking-wide"
        style={{ color: 'var(--cream)' }}
      >
        {name}
      </p>
      <p
        className="mt-3 text-sm leading-relaxed"
        style={{ color: 'var(--body-75)' }}
      >
        {description}
      </p>
      <a
        href="https://wa.me/50237590104"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block text-sm transition-opacity hover:opacity-80"
        style={{ color: 'var(--gold)' }}
      >
        {t('footer.whatsapp_cta')}
      </a>
    </div>
  )
}

function MenuSectionComponent({ section }: { section: MenuSection }) {
  const { t } = useTranslation('menu')

  const title = t(section.titleKey)
  const isGuarniciones = section.type === 'guarniciones'
  const isBuffet = section.type === 'buffet'

  return (
    <section className="px-6 py-10 sm:px-10 md:px-16">
      <SectionHeader number={section.number} title={title} />
      <div className="mx-auto max-w-xl">
        {/* Simple dishes (no subsections) */}
        {section.dishes && !section.subsections && (
          <>
            {isBuffet
              ? section.dishes.map((dish) => (
                  <BuffetBanner
                    key={dish.nameKey}
                    name={t(dish.nameKey)}
                    description={t(dish.descriptionKey)}
                  />
                ))
              : isGuarniciones
                ? section.dishes.map((dish) => (
                    <GuarnicionRow
                      key={dish.nameKey}
                      name={t(dish.nameKey)}
                      price={dish.price}
                    />
                  ))
                : section.dishes.map((dish) => (
                    <DishRow
                      key={dish.nameKey}
                      name={t(dish.nameKey)}
                      price={dish.price}
                      description={t(dish.descriptionKey)}
                      note={dish.noteKey ? t(dish.noteKey) : undefined}
                    />
                  ))}
          </>
        )}

        {/* Dishes before subsections (e.g. Entradas) */}
        {section.dishes && section.subsections && (
          <>
            {section.dishes.map((dish) => (
              <DishRow
                key={dish.nameKey}
                name={t(dish.nameKey)}
                price={dish.price}
                description={t(dish.descriptionKey)}
                note={dish.noteKey ? t(dish.noteKey) : undefined}
              />
            ))}
          </>
        )}

        {/* Subsections */}
        {section.subsections?.map((sub) => (
          <div key={sub.subtitleKey}>
            <SubSectionHeader subtitle={t(sub.subtitleKey)} />
            {sub.dishes.map((dish) => (
              <DishRow
                key={dish.nameKey}
                name={t(dish.nameKey)}
                price={dish.price}
                description={t(dish.descriptionKey)}
                note={dish.noteKey ? t(dish.noteKey) : undefined}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── Services ─── */

function ServicesSection() {
  const { t } = useTranslation('services')

  return (
    <section className="px-6 py-12 sm:px-10 md:px-16">
      <div className="animate-on-scroll mb-10 text-center">
        <span
          className="font-mono text-xs tracking-[0.3em] uppercase"
          style={{ color: 'var(--gold-muted)' }}
        >
          {t('section_label')}
        </span>
        <h2
          className="font-display mt-3 text-lg font-400 tracking-[0.2em] uppercase"
          style={{ color: 'var(--cream)' }}
        >
          {t('section_title')}
        </h2>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2">
        {servicesData.map((service) => (
          <div
            key={service.titleKey}
            className="animate-on-scroll rounded-sm border border-[var(--gold-dim)] bg-[var(--bg-elevated)] p-5 text-center"
          >
            <h3
              className="font-display text-sm font-400 tracking-wide"
              style={{ color: 'var(--cream)' }}
            >
              {t(service.titleKey)}
            </h3>
            <p
              className="mt-2 text-xs"
              style={{ color: 'var(--body-75)' }}
            >
              {t(service.descriptionKey)}
            </p>
            <p
              className="font-mono mt-1 text-[11px] tracking-wide"
              style={{ color: 'var(--gold-muted)' }}
            >
              {t(service.timeKey)}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── Special Services ─── */

function SpecialServicesSection() {
  const { t } = useTranslation('services')

  return (
    <section className="px-6 py-12 sm:px-10 md:px-16">
      <div className="animate-on-scroll mb-10 text-center">
        <span
          className="font-mono text-xs tracking-[0.3em] uppercase"
          style={{ color: 'var(--gold-muted)' }}
        >
          {t('special.section_label')}
        </span>
        <h2
          className="font-display mt-3 text-lg font-400 tracking-[0.2em] uppercase"
          style={{ color: 'var(--cream)' }}
        >
          {t('special.section_title')}
        </h2>
      </div>
      <div className="mx-auto max-w-2xl space-y-6">
        {specialServicesData.map((service) => (
          <div key={service.titleKey} className="animate-on-scroll">
            <h3
              className="font-display text-sm font-400 tracking-wide"
              style={{ color: 'var(--cream)' }}
            >
              {t(service.titleKey)}
            </h3>
            <p
              className="mt-2 text-sm leading-relaxed"
              style={{ color: 'var(--body-75)' }}
            >
              {t(service.descriptionKey)}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── Main App ─── */

function App() {
  const containerRef = useScrollReveal()
  const { t, i18n } = useTranslation()

  // Sync HTML lang attribute, document title, and meta description
  useEffect(() => {
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  useEffect(() => {
    document.title = t('meta:title')
  }, [t, i18n.language])

  useEffect(() => {
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', t('meta:description'))
    }
  }, [t, i18n.language])

  return (
    <div ref={containerRef} className="mx-auto max-w-2xl">
      <Intro />
      <LanguageSwitcher />

      {/* ─── Hero ─── */}
      <header className="relative flex flex-col items-center justify-center px-6 pt-20 pb-16 text-center sm:pt-28 sm:pb-20 overflow-hidden">
        {/* Watermark pattern */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: 0.2 }}
        >
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="lemon-pattern" x="0" y="0" width="120" height="136" patternUnits="userSpaceOnUse">
                <g transform="translate(30, 34) scale(0.5)">
                  <circle cx="30" cy="29" r="25" fill="#EFC12B" opacity="0.3"/>
                  <circle cx="30" cy="29" r="19" stroke="#EFC12B" strokeWidth="1.2" opacity="0.2"/>
                  <line x1="30" y1="29" x2="30" y2="10" stroke="#EFC12B" strokeWidth="0.9" opacity="0.2"/>
                  <line x1="30" y1="29" x2="46.5" y2="19.5" stroke="#EFC12B" strokeWidth="0.9" opacity="0.2"/>
                  <line x1="30" y1="29" x2="46.5" y2="38.5" stroke="#EFC12B" strokeWidth="0.9" opacity="0.2"/>
                  <line x1="30" y1="29" x2="30" y2="48" stroke="#EFC12B" strokeWidth="0.9" opacity="0.2"/>
                  <line x1="30" y1="29" x2="13.5" y2="38.5" stroke="#EFC12B" strokeWidth="0.9" opacity="0.2"/>
                  <line x1="30" y1="29" x2="13.5" y2="19.5" stroke="#EFC12B" strokeWidth="0.9" opacity="0.2"/>
                  <circle cx="30" cy="29" r="2.8" fill="#EFC12B" opacity="0.2"/>
                  <path d="M30 54 C28.4 57.3 27.8 62 30 64.3 C32.2 62 31.6 57.3 30 54Z" fill="#EFC12B" opacity="0.3"/>
                </g>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#lemon-pattern)"/>
          </svg>
        </div>
        
        <div className="animate-on-scroll relative z-10">
          <p
            className="font-mono mb-4 text-[10px] tracking-[0.4em] uppercase"
            style={{ color: 'var(--gold-muted)' }}
          >
            {t('ui:hotel_label')}
          </p>
          <h1
            className="font-display text-6xl font-300 tracking-wide sm:text-7xl md:text-8xl"
            style={{ color: 'var(--cream)' }}
          >
            ETROG
          </h1>
          <div
            className="mx-auto mt-4 h-px w-16"
            style={{ background: 'var(--gold)' }}
          />
          <p
            className="font-display mt-4 text-sm tracking-[0.35em] uppercase font-300"
            style={{ color: 'var(--gold)' }}
          >
            {t('ui:aroma_y_sabor')}
          </p>
          <p
            className="font-body mt-6 text-xs tracking-wide"
            style={{ color: 'var(--body-50)' }}
          >
            {t('ui:location')}
          </p>
        </div>
      </header>

      <GoldDivider strong />

      {/* ─── Intro ─── */}
      <section className="px-6 py-14 text-center sm:px-10 md:px-16">
        <div className="animate-on-scroll mx-auto max-w-lg">
          <blockquote>
            <p
              className="font-display text-lg leading-relaxed italic font-300 sm:text-xl"
              style={{ color: 'var(--cream)' }}
            >
              {t('ui:intro_quote')}
            </p>
          </blockquote>
          <div
            className="mx-auto mt-8 mb-8 h-px w-8"
            style={{ background: 'var(--gold-dim)' }}
          />
          <p
            className="text-sm leading-relaxed"
            style={{ color: 'var(--body-75)' }}
          >
            {t('ui:intro_text')}
          </p>
        </div>
      </section>

      <GoldDivider strong />

      {/* ─── Menu Sections ─── */}
      {menuSections.map((section, i) => (
        <div key={section.number}>
          <MenuSectionComponent section={section} />
          {i < menuSections.length - 1 && <GoldDivider />}
        </div>
      ))}

      <GoldDivider strong />

      {/* ─── Services ─── */}
      <ServicesSection />

      <GoldDivider />

      {/* ─── Special Services ─── */}
      <SpecialServicesSection />

      <GoldDivider strong />

      {/* ─── Footer ─── */}
      <footer className="px-6 py-14 text-center sm:px-10">
        <div className="animate-on-scroll">
          <p
            className="font-display text-2xl font-300 tracking-wide"
            style={{ color: 'var(--cream)' }}
          >
            {t('ui:footer.tagline')}
          </p>
          <p
            className="mt-3 text-sm"
            style={{ color: 'var(--body-75)' }}
          >
            {t('ui:footer.location')}
          </p>
          <a
            href="https://wa.me/50237590104"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm transition-opacity hover:opacity-80"
            style={{ color: 'var(--gold)' }}
          >
            WhatsApp: +502 3759 0104
          </a>
          <br />
          <a
            href="mailto:etrog007@gmail.com"
            className="mt-1 inline-block text-sm transition-opacity hover:opacity-80"
            style={{ color: 'var(--body-50)' }}
          >
            etrog007@gmail.com
          </a>

          <div
            className="mx-auto mt-8 mb-6 h-px w-12"
            style={{ background: 'var(--gold-dim)' }}
          />

          <div className="animate-on-scroll mt-6">
            <p
              className="font-mono mb-3 text-[10px] tracking-[0.25em] uppercase"
              style={{ color: 'var(--body-50)' }}
            >
              {t('ui:footer.price_range_label')}
            </p>
            <p
              className="font-body text-xs"
              style={{ color: 'var(--body-75)' }}
            >
              {t('ui:footer.price_breakfast')}
            </p>
            <p
              className="font-body mt-1 text-xs"
              style={{ color: 'var(--body-75)' }}
            >
              {t('ui:footer.price_main')}
            </p>
            <p
              className="font-body mt-1 text-xs"
              style={{ color: 'var(--body-75)' }}
            >
              {t('ui:footer.price_grill')}
            </p>
            <p
              className="font-body mt-1 text-xs"
              style={{ color: 'var(--body-75)' }}
            >
              {t('ui:footer.price_drinks')}
            </p>
          </div>

          <p
            className="font-body mt-8 text-[11px] italic"
            style={{ color: 'var(--body-30)' }}
          >
            {t('ui:footer.pride')}
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
