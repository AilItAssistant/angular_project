import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  accommodations: any;
  alumnos: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>('http://localhost:4000/api/accommodations').subscribe({
      next: (res) => {
        this.accommodations = res;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });

    this.http.get<any>('http://localhost:4000/api/alumnos').subscribe({
      next: (res) => {
        this.alumnos = res;
      },
      error: (err) => {
        alert('Cargar fallo' + err);
      },
    });
  }

  generatePdf() {
    this.http.get<any>('http://localhost:4000/api/examPdf');
  }

  title: string = 'exam-project';

  exams = [
    {
      id: '12364268',
      name: 'Estar o hay',
      question: [
        {
          statement: '¿Dónde ______ una papelera? Necesito tirar este papel.',
          responses: ['a. Está', 'b. Hay', 'c. Es'],
          id: '123642424268',
        },
        {
          statement:
            'Disculpe, ¿puede decirme dónde _____ la estación de metro más cercana?',
          responses: ['a. Está', 'b. Hay', 'c. Es'],
          id: '1234464268',
        },
        {
          statement: 'En la esquina de la avenida ______ tres bancos.',
          responses: ['a. Está', 'b. Hay', 'c. Es'],
          id: '123642468',
        },
        {
          statement: 'Algunas personas de la clase ______ en el pasillo.',
          responses: ['a. Está', 'b. Hay', 'c. Son'],
          id: '1236424344468',
        },
      ],
    },
    {
      id: '1236423443434868',
      name: 'Tener o haber',
      question: [
        {
          statement: 'En mi ciudad ______ muchas zonas verdes.',
          responses: ['a. Hay', 'b. Están', 'c. Tienen'],
          id: '1236426858',
        },
        {
          statement: 'Mi barrio ______ varias floristerías.',
          responses: ['a. Está', 'b. Hay', 'c. Tiene'],
          id: '12364654268',
        },
        {
          statement: 'Al final de la clase ______ un mapa y un perchero.',
          responses: ['a. Está', 'b. Tiene', 'c. Hay'],
          id: '1236854268',
        },
        {
          statement: 'La tienda de ropa _______ dos probadores.',
          responses: ['a. Gusta', 'b. Encantan', 'c. Intereso'],
          id: '12364875268',
        },
      ],
    },
    {
      id: '123648568268',
      name: 'Gustar y similares',
      question: [
        {
          statement: 'A mí me _______ los helados de chocolate.',
          responses: ['a. Gusta', 'b. Encantan', 'c. Intereso'],
          id: '123685664268',
        },
        {
          statement: '¿Te ________ la cultura española?',
          responses: ['a. Importan', 'b. Gustas', 'c. Interesa'],
          id: '123645365268',
        },
        {
          statement: 'A mi hermano le _______ hacer senderismo.',
          responses: ['a. Gusta', 'b. Prefiere', 'c. Preocupo'],
          id: '1236453695268',
        },
        {
          statement: 'Nos _______ el flamenco y el tango.',
          responses: ['a. Encantamos ', 'b. Preocupa', 'c. Gustan'],
          id: '1236425365236568',
        },
      ],
    },
    {
      id: '12364535898268',
      name: 'Presente irregular',
      question: [
        {
          statement:
            'Mientras tú preparas la comida, yo ______ la mesa, ¿vale?',
          responses: ['a. Pono', 'b. Pongo', 'c. Pone'],
          id: '12368569856956954268',
        },
        {
          statement: 'Cuando yo _______, siempre escucho música.',
          responses: ['a. Conduzo', 'b. Conduco', 'c. Conduzco'],
          id: '12364536565268',
        },
        {
          statement: '¿No _______ que la comida ecuatoriana es deliciosa?',
          responses: ['a. Piensas', 'b. Pensas', 'c. Pensa'],
          id: '12356365264268',
        },
        {
          statement: 'Estamos buscando trabajo, pero no lo _______.',
          responses: ['a. Encuentramos ', 'b. Encontramos'],
          id: '1235236523664268',
        },
      ],
    },
    {
      id: '16523632364268',
      name: 'Descripción física',
      question: [
        {
          statement: 'Mi vecina Malena tiene el pelo ______.',
          responses: ['a. Rubia', 'b. Rubio', 'c. Larga'],
          id: '123642623652368',
        },
        {
          statement: 'Mi hermana y yo _______ los ojos marrones.',
          responses: ['a. Tenemos', 'b. LLevamos', 'c. Somos'],
          id: '123642536523268',
        },
        {
          statement: 'Su abuelo no tiene pelo, es _______.',
          responses: ['a. Castaño', 'b. Canoso', 'c. Calvo'],
          id: '1236475463795268',
        },
        {
          statement: '¿Tú _______ gafas para leer solamente?',
          responses: ['a. Tienes ', 'b. Llevas', 'c. Eres'],
          id: '12364854635735354268',
        },
      ],
    },
    {
      id: '123646527856487268',
      name: 'Género y número',
      question: [
        {
          statement: 'Siempre lleva pantalones vaqueros ________, le encantan.',
          responses: ['a. Corto', 'b. Azul', 'c. Azules'],
          id: '123687653689545434268',
        },
        {
          statement:
            'No me gusta el agua ________, no es bueno para la garganta.',
          responses: ['a. Fría', 'b. Frío', 'c. Caliento'],
          id: '123648538954374562268',
        },
        {
          statement: 'En las fotos, las personas están _______.',
          responses: ['a. Feliz', 'b. Felices', 'c. Felizes'],
          id: '123854326543264268',
        },
        {
          statement: 'El planeta de la película es muy ______.',
          responses: ['a. Peligroso ', 'b. Segura', 'c. Especiales'],
          id: '12366453464534268',
        },
      ],
    },
    {
      id: '1236446852983563268',
      name: 'Cantidad',
      question: [
        {
          statement: 'En mi país hay ______ gente.',
          responses: ['a. Muchos', 'b. Algunas', 'c. Poca'],
          id: '12363453685365436534268',
        },
        {
          statement: 'En esta carretera, los domingos hay ________ coches.',
          responses: ['a. Muchos', 'b. Muy', 'c. Algún'],
          id: '1236453653453451234268',
        },
        {
          statement: 'La calle donde vivo es _______ tranquila.',
          responses: ['a. Mucho', 'b. Muy', 'c. Poca'],
          id: '123453453543425231364521364268',
        },
        {
          statement: 'No hay ______ farmacia cerca de mi casa.',
          responses: ['a. Alguna ', 'b. Ninguna', 'c. Mucha'],
          id: '123435555555555555555555555564268',
        },
      ],
    },
    {
      id: '1236444444444444444446268',
      name: 'Reflexivos',
      question: [
        {
          statement:
            'Todos los días _______ temprano, a las siete de la mañana.',
          responses: ['a. Despierto', 'b. Me despierto', 'c. Desperto'],
          id: '12345633333333645464268',
        },
        {
          statement: 'La niña ya _______ sola, no necesita ayuda.',
          responses: ['a. Se viste', 'b. Se veste', 'c. Viste'],
          id: '12368767537453784268',
        },
        {
          statement: '¿A qué hora _______ vosotros los sábados?',
          responses: ['a. Acostáis', 'b. Os acostáis', 'c. Acuestáis'],
          id: '1278625462364268',
        },
        {
          statement: '¿Tú _______ los dientes tres veces al día?',
          responses: ['a. Cepillas ', 'b. Laves', 'c. Te cepillas'],
          id: '123687654278453278544268',
        },
      ],
    },
    {
      id: '123678546327845375434268',
      name: 'Ropa',
      question: [
        {
          statement:
            'Voy a viajar por el norte y llueve mucho, necesito un _______.',
          responses: ['a. Chubasquero', 'b. Sombrero', 'c. Chándal'],
          id: '12362543754237452364268',
        },
        {
          statement: 'Si no me pongo los _______, tengo las manos heladas.',
          responses: ['a. Calcetines', 'b. Vaqueros', 'c. Guantes'],
          id: '1236478546328965432854324268',
        },
        {
          statement: 'Quiero comprarme un _______ para nadar.',
          responses: ['a. Bañador', 'b. Traje', 'c. Polo'],
          id: '123674563986543784514268',
        },
        {
          statement: 'Carmela prefiere llevar ______ que pantalones.',
          responses: ['a. Corbata ', 'b. Chaqueta', 'c. Falda'],
          id: '12369563965322484268',
        },
      ],
    },
    {
      id: '123642688686868',
      name: 'Tiempo atmosférico',
      question: [
        {
          statement: 'En junio no _______ frío, no necesitas abrigo.',
          responses: ['a. Es', 'b. Hace', 'c. Está'],
          id: '12368',
        },
        {
          statement: 'Hoy hace un día malo, _______ nublado.',
          responses: ['a. Está', 'b. Es', 'c. Hace'],
          id: '4268',
        },
        {
          statement: 'En invierno ______ mucho.',
          responses: ['a. Lluvia', 'b. Llueve', 'c. Llove'],
          id: '12353535353535268',
        },
        {
          statement:
            'Mi estación favorita es el ______, porque los árboles están amarillos y rojos.',
          responses: ['a. Otoño ', 'b. Verano', 'c. Primavera'],
          id: '12785453364268',
        },
      ],
    },
    {
      id: '123687452875462784562785434268',
      name: 'Pretérito perfecto',
      question: [
        {
          statement: 'Esta mañana mis amigos y yo _____ un vídeo.',
          responses: ['a. Hemos hacido', 'b. Hamos hecho', 'c. Hemos hecho'],
          id: '1237865375437254375464268',
        },
        {
          statement: '¿Todavía no ______ la película?',
          responses: ['a. Hais visto', 'b. Habéis visto', 'c. Habéis vida'],
          id: '12378456728567864268',
        },
        {
          statement: 'El niño ______ el juguete hoy.',
          responses: ['a. Has roto', 'b. He rompido', 'c. Ha roto'],
          id: '12387666666666678564268',
        },
        {
          statement: '¿Alguna vez tú ______ un mensaje en español?',
          responses: ['a. Has escrito ', 'b. Has escribió', 'c. He escrito'],
          id: '12788888862364268',
        },
      ],
    },
    {
      id: '12364876567685278665268',
      name: 'Pronombres OD y OI gustar',
      question: [
        {
          statement: 'La verdura, ¿cómo _____ preparas?',
          responses: ['a. La', 'b. Lo', 'c. Las'],
          id: '12378628756278687542764268',
        },
        {
          statement: 'A Martín _____ encanta este blog de viajes.',
          responses: ['a. Lo', 'b. Le', 'c. Te'],
          id: '123687687527854628754268',
        },
        {
          statement: 'Los huevos _____ pongo en la nevera.',
          responses: ['a. Los', 'b. Les', 'c. Me'],
          id: '1238287272728728728728764268',
        },
        {
          statement: 'A mis primas _______ apasiona la montaña.',
          responses: ['a. Os', 'b. Les', 'c. Las'],
          id: '12368678686876868684268',
        },
      ],
    },
    {
      id: '123268',
      name: 'Preposiciones',
      question: [
        {
          statement: 'Este fin de semana nos vamos _____ excursión.',
          responses: ['a. A la', 'b. Al', 'c. De'],
          id: '123456767676767676764268',
        },
        {
          statement: 'Aquella catarata es la más alta ____ país.',
          responses: ['a. Del', 'b. De', 'c. En'],
          id: '17676676767676762364268',
        },
        {
          statement: '¿Echas de menos _______ tu familia?',
          responses: ['a. De', 'b. Sin preposición', 'c. A'],
          id: '123642687666767676767',
        },
        {
          statement: 'Elena nunca ha ido _______ exposición.',
          responses: ['a. A un', 'b. A una', 'c. De'],
          id: '12376767667564268',
        },
      ],
    },
    {
      id: '123642677171717171117168',
      name: 'Vocabulario',
      question: [
        {
          statement: '¿Me trae, por favor, una ______ para comer la sopa?',
          responses: ['a. Cuchillo', 'b. Tenedor', 'c. Cuchara'],
          id: '122888282828282828282364268',
        },
        {
          statement:
            'Voy a ir a la playa y quiero llevarme una camiseta de _______.',
          responses: ['a. Manga larga', 'b. Tirantes', 'c. Cuadros'],
          id: '12363939393939393934268',
        },
        {
          statement:
            'Su tío pone todas las cosas en su lugar. Es muy ________.',
          responses: ['a. Despistado', 'b. Organizado', 'c. Abierto'],
          id: '123643838383838388383268',
        },
        {
          statement:
            'Su barrio tiene mucha vida nocturna, todas las noches hay gente, es muy _______.',
          responses: ['a. Barato', 'b. Feo', 'c. Ruidosa'],
          id: '12364238228215483568',
        },
      ],
    },
    {
      id: '12371185858558585858564268',
      name: 'Variadas de gramática',
      question: [
        {
          statement: '_______ desierto es el más grande del mundo.',
          responses: ['a. Esto', 'b. Este', 'c. Esta'],
          id: '1236426744747474747474748',
        },
        {
          statement: '¿ ________ son las castañuelas? ¿Un instrumento musical?',
          responses: ['a. Cuál', 'b. Cuáles', 'c. Qué'],
          id: '1236427474747474747474747474768',
        },
        {
          statement: 'Leandro tiene dos cuñadas. ______ cuñadas son de México.',
          responses: ['a. Su', 'b. Sus', 'c. Suyas'],
          id: '12364286866969698568',
        },
        {
          statement: 'La heladería está ________ taller.',
          responses: ['a. A la derecha', 'b. Al lado del', 'c. Cerca'],
          id: '12364587447554757575268',
        },
      ],
    },
  ];
}
