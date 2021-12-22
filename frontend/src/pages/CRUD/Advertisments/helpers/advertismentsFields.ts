
const advertismentsFields = {
	id: { type: 'id', label: 'ID' },

    user: { type: 'relation_one', label: 'user',

    },

    IniDate: { type: 'datetime', label: 'Initial Date',

    },

    endDate: { type: 'datetime', label: 'end Date',

    },

    active: { type: 'boolean', label: 'active',

    },

    expression: { type: 'enum', label: 'expression',

    options: [

    { value: 'neutral', label: 'neutral' },

    { value: 'happy', label: 'happy' },

]

    },

    location: { type: 'string', label: 'location',

    },

    name: { type: 'string', label: 'name',

    },

    ad_image: { type: 'images', label: 'ad_image',

    },

    age: { type: 'enum', label: 'age',

    options: [

    { value: '12 – 17', label: '12 – 17' },

    { value: '18 – 24', label: '18 – 24' },

    { value: '25 – 34', label: '25 – 34' },

    { value: '35 – 44', label: '35 – 44' },

    { value: '45 – 54', label: '45 – 54' },

    { value: '55 – 64', label: '55 – 64' },

    { value: '65+', label: '65+' },

]

    },

    gender: { type: 'enum', label: 'gender',

    options: [

    { value: 'male', label: 'male' },

    { value: 'female', label: 'female' },

    { value: 'unisex', label: 'unisex' },

]

    },

    coefficient: { type: 'int', label: 'coefficient',

    },

}

export default advertismentsFields;
