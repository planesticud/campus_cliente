import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { GENERAL } from './../../app-config';
import { ImplicitAutenticationService } from './implicit_autentication.service';
import { ConfiguracionService } from './../data/configuracion.service';
import { from } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { map } from 'rxjs-compat/operators/map';

const CHAT_URL = GENERAL.ENTORNO.NOTIFICACION_SERVICE;

@Injectable({
    providedIn: 'root',
})
export class NotificacionesService {
    public messagesSubject: Subject<any>;

    public listMessage: any;
    public payload: any;

    private noNotifySubject = new Subject();
    public noNotify$ = this.noNotifySubject.asObservable();

    private arrayMessagesSubject = new Subject();
    public arrayMessages$ = this.arrayMessagesSubject.asObservable();

    constructor(
        private confService: ConfiguracionService,
        private authService: ImplicitAutenticationService,
    ) {
        this.listMessage = [];
        this.connect();
        if (this.authService.live()) {
            this.queryNotification('ADMIN_CAMPUS');
        }
    }

    getNotificaciones() {
        this.noNotifySubject.next(this.listMessage.length);
        this.arrayMessagesSubject.next(this.listMessage);
    }

    connect() {
        if (this.authService.live()) {
            this.payload = this.authService.getPayload();
            this.messagesSubject = webSocket(`${CHAT_URL}?id=${this.payload.sub}&profiles=ADMIN_CAMPUS`);
            this.messagesSubject
                .pipe(
                    map((msn) => {
                        this.listMessage = [...[msn], ...this.listMessage];
                        this.noNotifySubject.next(this.listMessage.length);
                        this.arrayMessagesSubject.next(this.listMessage);
                        return msn
                    }),
                )
                .subscribe(
                    (msg: any) => console.info('Nueva notificación', msg),
                    err => {
                        console.info(err);
                        this.connect();
                    },
                    () => console.info('complete'),
                );
        }
    }

    close() {
        this.messagesSubject.unsubscribe();
    }

    addMessage(message) {
        this.listMessage = [...[message], ...this.listMessage];
        this.noNotifySubject.next(this.listMessage.length);
        this.arrayMessagesSubject.next(this.listMessage);
        console.info(this.listMessage)
    }

    queryNotification(profile) {
        this.confService.get('notificacion_estado_usuario?query=Usuario:' + this.payload.sub + ',Activo:true&sortby=id&order=asc&limit=-1')
            .subscribe((resp: any) => {
                if (resp !== null) {
                    from(resp)
                        .subscribe((notify: any) => {
                            const message = {
                                Type: notify.Notificacion.NotificacionConfiguracion.Tipo.Id,
                                Content: JSON.parse(notify.Notificacion.CuerpoNotificacion),
                                User: notify.Notificacion.NotificacionConfiguracion.Aplicacion.Nombre,
                                FechaCreacion: new Date(notify.Notificacion.FechaCreacion),
                                FechaEdicion: new Date(notify.Fecha),
                                Estado: notify.NotificacionEstado.CodigoAbreviacion,
                            };
                            this.addMessage(message);
                        });
                }

            });
        
    }

}
