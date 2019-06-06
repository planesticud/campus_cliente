import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { WebsocketService } from './websocket.service';
import { GENERAL } from './../../app-config';
import { ImplicitAutenticationService } from './implicit_autentication.service';
import { ConfiguracionService } from './../data/configuracion.service';
import { from } from 'rxjs';
import { webSocket } from "rxjs/webSocket";
import { map } from 'rxjs-compat/operators/map';

const CHAT_URL = GENERAL.ENTORNO.NOTIFICACION_SERVICE;

@Injectable()
export class NotificacionesService {
    static messagesSubject: Subject<any>;

    static listMessage: any;
    payload: any;

    static noNotifySubject = new Subject();
    static noNotify$ = NotificacionesService.noNotifySubject.asObservable();

    static arrayMessagesSubject = new Subject();
    static arrayMessages$ = NotificacionesService.arrayMessagesSubject.asObservable();

    constructor(
        private confService: ConfiguracionService,
        private authService: ImplicitAutenticationService,
    ) {
        NotificacionesService.listMessage = [];
        if (this.authService.live()) {
            this.payload = this.authService.getPayload();
            NotificacionesService.messagesSubject = webSocket(`${CHAT_URL}?id=${this.payload.sub}&profiles=${this.payload.role}`);
            console.log('hey hey');
            this.queryNotification('ADMIN_CAMPUS');
            NotificacionesService.messagesSubject
                .pipe(
                    map((msn) => {
                        NotificacionesService.listMessage = [...[msn], ...NotificacionesService.listMessage];
                        NotificacionesService.noNotifySubject.next(NotificacionesService.listMessage.length);
                        NotificacionesService.arrayMessagesSubject.next(NotificacionesService.listMessage);
                    })
                )
                .subscribe(
                    (msg: any) => console.log('Nueva notificación: ' + msg), 
                    err => console.log(err),
                    () => console.log('complete')
                );
        }
    }
    
    connect(){
        
    }

    addMessage(message) {
        NotificacionesService.listMessage = [...[message], ...NotificacionesService.listMessage];
        NotificacionesService.noNotifySubject.next(NotificacionesService.listMessage.length);
        NotificacionesService.arrayMessagesSubject.next(NotificacionesService.listMessage);
    }

    queryNotification(profile) {
        this.confService.get('notificacion?query=Usuario:' + this.payload.sub + '&sortby=FechaCreacion&order=asc&limit=-1')
            .subscribe((resp: any) => {
                if (resp !== null) {
                    from(resp)
                        .subscribe((notify: any) => {
                            const message = {
                                Type: notify.NotificacionConfiguracion.Tipo.Id,
                                Content: JSON.parse(notify.CuerpoNotificacion),
                                User: notify.NotificacionConfiguracion.Aplicacion.Nombre,
                                FechaCreacion: new Date(notify.FechaCreacion),

                            };
                            this.addMessage(message);
                        });
                }
            });
        this.confService.get('notificacion_configuracion_perfil?query=Perfil.Nombre:' + profile + '&limit=-1')
            .subscribe(response => {
                from(response)
                    .subscribe((res: any) => {
                        this.confService.get('notificacion?query=NotificacionConfiguracion.Id:' +
                            res.NotificacionConfiguracion.Id + ',Usuario:' + '&sortby=FechaCreacion&order=asc&limit=-1')
                            .subscribe((resp: any) => {
                                if (resp !== null) {
                                    from(resp)
                                        .subscribe((notify: any) => {
                                            const message = {
                                                Type: notify.NotificacionConfiguracion.Tipo.Id,
                                                Content: JSON.parse(notify.CuerpoNotificacion),
                                                User: notify.NotificacionConfiguracion.Aplicacion.Nombre,
                                                FechaCreacion: new Date(notify.FechaCreacion),
                                            };
                                            this.addMessage(message);
                                        });
                                }
                            });
                    });
            });
    }
}
