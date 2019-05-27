import {App} from './App';
import {Container} from 'typescript-ioc';
import {ContainerConfig} from 'typescript-ioc/container-config';

if (process.env.GPIO || process.argv.includes('--gpio')) {
    ContainerConfig.addSource('services/gpioImpl/*Impl.ts', __dirname);
} else {
    ContainerConfig.addSource('services/testImpl/*Impl.ts', __dirname);
}

Container.get(App).start();
