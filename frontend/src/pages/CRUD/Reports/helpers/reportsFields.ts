
const reportsFields = {
	id: { type: 'id', label: 'ID' },

    title: { type: 'string', label: 'Title',

    },

    description: { type: 'string', label: 'Description',

    },

    author: { type: 'relation_one', label: 'Author',

    },

    images: { type: 'images', label: 'Images',

    },

    priority: { type: 'string', label: 'Priority',

    options: [

    { value: 'Low', label: 'Low' },

    { value: ' Medium', label: ' Medium' },

    { value: ' High', label: ' High' },

]

    },

    date: { type: 'datetime', label: 'date',

    },

    category: { type: 'string', label: 'category',

    options: [

    { value: 'First', label: 'First' },

    { value: ' Second', label: ' Second' },

    { value: ' Third', label: ' Third' },

]

    },

}

export default reportsFields;
