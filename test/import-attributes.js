/*
  Copyright (C) 2025 Timofey Kachalov <sanex3339@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

'use strict';

var escodegen = require('./loader'),
    chai = require('chai'),
    expect = chai.expect;

describe('import attributes', function () {
    // Test: import with "with" syntax (ES2025)
    describe('import with "with" syntax', function () {
        it('should generate import with attributes', function () {
            var ast = {
                type: 'Program',
                body: [{
                    type: 'ImportDeclaration',
                    specifiers: [{
                        type: 'ImportDefaultSpecifier',
                        local: { type: 'Identifier', name: 'config' }
                    }],
                    source: { type: 'Literal', value: './config.json' },
                    attributes: [{
                        type: 'ImportAttribute',
                        key: { type: 'Identifier', name: 'type' },
                        value: { type: 'Literal', value: 'json' }
                    }]
                }],
                sourceType: 'module'
            };

            var result = escodegen.generate(ast);
            expect(result).to.equal('import config from \'./config.json\' with { type: \'json\' };');
        });

        it('should generate import with multiple attributes', function () {
            var ast = {
                type: 'Program',
                body: [{
                    type: 'ImportDeclaration',
                    specifiers: [{
                        type: 'ImportDefaultSpecifier',
                        local: { type: 'Identifier', name: 'data' }
                    }],
                    source: { type: 'Literal', value: './data.json' },
                    attributes: [
                        {
                            type: 'ImportAttribute',
                            key: { type: 'Identifier', name: 'type' },
                            value: { type: 'Literal', value: 'json' }
                        },
                        {
                            type: 'ImportAttribute',
                            key: { type: 'Identifier', name: 'integrity' },
                            value: { type: 'Literal', value: 'sha384-abc' }
                        }
                    ]
                }],
                sourceType: 'module'
            };

            var result = escodegen.generate(ast);
            expect(result).to.equal('import data from \'./data.json\' with { type: \'json\', integrity: \'sha384-abc\' };');
        });

        it('should generate side-effect import with attributes', function () {
            var ast = {
                type: 'Program',
                body: [{
                    type: 'ImportDeclaration',
                    specifiers: [],
                    source: { type: 'Literal', value: './styles.css' },
                    attributes: [{
                        type: 'ImportAttribute',
                        key: { type: 'Identifier', name: 'type' },
                        value: { type: 'Literal', value: 'css' }
                    }]
                }],
                sourceType: 'module'
            };

            var result = escodegen.generate(ast);
            expect(result).to.equal('import \'./styles.css\' with { type: \'css\' };');
        });
    });

    // Test: import with "assert" syntax (deprecated)
    describe('import with "assert" syntax (deprecated)', function () {
        it('should generate import with assertions', function () {
            var ast = {
                type: 'Program',
                body: [{
                    type: 'ImportDeclaration',
                    specifiers: [{
                        type: 'ImportDefaultSpecifier',
                        local: { type: 'Identifier', name: 'config' }
                    }],
                    source: { type: 'Literal', value: './config.json' },
                    assertions: [{
                        type: 'ImportAttribute',
                        key: { type: 'Identifier', name: 'type' },
                        value: { type: 'Literal', value: 'json' }
                    }]
                }],
                sourceType: 'module'
            };

            var result = escodegen.generate(ast);
            expect(result).to.equal('import config from \'./config.json\' assert { type: \'json\' };');
        });
    });

    // Test: export with "with" syntax
    describe('export with "with" syntax', function () {
        it('should generate named export with attributes', function () {
            var ast = {
                type: 'Program',
                body: [{
                    type: 'ExportNamedDeclaration',
                    declaration: null,
                    specifiers: [{
                        type: 'ExportSpecifier',
                        local: { type: 'Identifier', name: 'default' },
                        exported: { type: 'Identifier', name: 'config' }
                    }],
                    source: { type: 'Literal', value: './config.json' },
                    attributes: [{
                        type: 'ImportAttribute',
                        key: { type: 'Identifier', name: 'type' },
                        value: { type: 'Literal', value: 'json' }
                    }]
                }],
                sourceType: 'module'
            };

            var result = escodegen.generate(ast);
            expect(result).to.contain('with { type: \'json\' }');
        });

        it('should generate export all with attributes', function () {
            var ast = {
                type: 'Program',
                body: [{
                    type: 'ExportAllDeclaration',
                    source: { type: 'Literal', value: './utils.js' },
                    exported: null,
                    attributes: [{
                        type: 'ImportAttribute',
                        key: { type: 'Identifier', name: 'type' },
                        value: { type: 'Literal', value: 'javascript' }
                    }]
                }],
                sourceType: 'module'
            };

            var result = escodegen.generate(ast);
            expect(result).to.equal('export * from \'./utils.js\' with { type: \'javascript\' };');
        });
    });

    // Test: no attributes
    describe('import without attributes', function () {
        it('should generate import without attributes when none present', function () {
            var ast = {
                type: 'Program',
                body: [{
                    type: 'ImportDeclaration',
                    specifiers: [{
                        type: 'ImportDefaultSpecifier',
                        local: { type: 'Identifier', name: 'foo' }
                    }],
                    source: { type: 'Literal', value: './foo.js' }
                }],
                sourceType: 'module'
            };

            var result = escodegen.generate(ast);
            expect(result).to.equal('import foo from \'./foo.js\';');
        });

        it('should generate import without attributes when attributes array is empty', function () {
            var ast = {
                type: 'Program',
                body: [{
                    type: 'ImportDeclaration',
                    specifiers: [{
                        type: 'ImportDefaultSpecifier',
                        local: { type: 'Identifier', name: 'bar' }
                    }],
                    source: { type: 'Literal', value: './bar.js' },
                    attributes: []
                }],
                sourceType: 'module'
            };

            var result = escodegen.generate(ast);
            expect(result).to.equal('import bar from \'./bar.js\';');
        });
    });
});
