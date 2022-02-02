import os from "os";
import config from '@/configs/config.json';


interface ConfigDTO {
    datafilePath: string
}

export class Config implements ConfigDTO {
    datafilePath: string

    constructor(params: ConfigDTO) {
        this.datafilePath = params.datafilePath
    }

    static getConfig(): Config {
        // @ts-ignore
        const datafilePath : string = config.hasOwnProperty('customDatafilePath') && config.customDatafilePath != null ?
            // @ts-ignore
            config.customDatafilePath :
            os.homedir() + '/radix_data_file'

        return new Config(
            {
                datafilePath: datafilePath
            }
        )

    }
}