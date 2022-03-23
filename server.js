const http = require('http');
const forever = require('forever');
const Koa = require('koa');
const koaBody = require('koa-body');

const app = new Koa();

app.use(koaBody({
  urlencoded: true,
  multipart: true
}));

let tickets = [
  {
  'name': 'Починить принтер',
  'description': 'В комнате 101 сломался принтер, на котором мы печатаем листовки - не работает бумагоприемник',
  'status': 'false',
  'created': '1647952489339',
  'id': 'l124d2t7'
  },
];

app.use(async (ctx) => {
  
  ctx.response.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET'
  });
  if (ctx.request.querystring === 'newTicket') {
    tickets.push(ctx.request.body);
    ctx.response.status = 203;
    ctx.response.body = 'OK';
    console.log(tickets);
  }
  if (ctx.request.querystring === 'allTickets') {
    ctx.response.body = tickets;
  }
  if (ctx.request.querystring === 'editTicket') {
    let ticketToRemove = tickets.findIndex((element) => element.id === ctx.request.body.id);
    console.log(ticketToRemove);
    tickets[ticketToRemove] = ctx.request.body;
    ctx.response.body = 'OK';
  }
  if (ctx.request.querystring === 'removeTicket') {
    tickets.splice(tickets.findIndex((element) => element.id === ctx.request.body), 1);
    ctx.response.body = 'OK';
  }
  if (ctx.request.querystring === 'changeStatus') {
    const index = tickets.findIndex((element) => element.id === ctx.request.body);
    if (tickets[index].status == 'false') {
      tickets[index].status = 'true'
    }
    else {
      tickets[index].status = 'false';
    }
    ctx.response.body = 'OK';
  }
  ctx.response.body = 'OK';
});
const PORT = process.env.PORT || 7070;
const server = http.createServer(app.callback()).listen(PORT);
